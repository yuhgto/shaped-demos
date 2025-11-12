"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowRight, Copy, Check } from "lucide-react"

export default function Home() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTextBoxChange = (e:any) => {
    setInputCode(e.target.value)
  }

  const handleSubmit = async () => {
    if (!inputCode.trim()) return

      setIsLoading(true)
      setOutputCode("")

      try {
        const response = await fetch("/api/refactor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: inputCode }),
        })

        const data = await response.json()
        if (data.refactoredCode) {
          setOutputCode(data.refactoredCode)
          setIsLoading(false)
          setTimeout(() => setShowResult(true), 100)
        }
      } catch (error) {
        console.error("Error refactoring code:", error)
        setIsLoading(false)
      }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInputCode("")
    setOutputCode("")
    setShowResult(false)
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">Replace complex Elastic DSL with a single YAML file</h1>
        {!showResult && (
          <div className="space-y-6 transition-opacity duration-300 opacity-100">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-sans text-sm text-foreground">
                <label htmlFor="code-input">
                  Your Elasticsearch Query Code
                </label>
                </h3>
                <Textarea
                  id="code-input"
                  placeholder="// Paste your Elasticsearch query code here...&#10;const query = {&#10;  query: {&#10;    match: {&#10;      title: 'search term'&#10;    }&#10;  }&#10;};"
                  className="text-light-contrast"
                  onChange={handleTextBoxChange}
                  />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!inputCode.trim()}
                size="lg"
                className="w-full md:w-auto"
              >
                Refactor Code
                {
                !isLoading ? 
                <ArrowRight className="size-4" />
                : <Spinner />
                }
              </Button>
            </Card>
          </div>
        )}

        {showResult && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Refactored Code</h2>
              <Button onClick={handleReset}>
                New Query
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Code */}
              <Card className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm tracking-wide">Original</h3>
                </div>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono text-foreground max-h-[400px] overflow-y-auto">
                  {inputCode}
                </pre>
              </Card>

              {/* Refactored Code */}
              <Card className="p-6 space-y-3 border-primary/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm tracking-wide">Refactored</h3>
                  <Button onClick={handleCopy} variant="ghost" size="sm" className="gap-2">
                    {copied ? (
                      <>
                        <Check className="size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono text-foreground max-h-[400px] overflow-y-auto">
                  {outputCode}
                </pre>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
