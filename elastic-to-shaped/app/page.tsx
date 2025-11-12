"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Copy, Check } from "lucide-react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-dark.css";

const DEFAULT_INPUT = `{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "description": {
              "query": "Blue jeans for summer",
              "operator": "and"
            }
          }
        }
      ],
      "should": [
        {
          "term": {
            "tags": {
              "value": "featured",
              "boost": 2.0
            }
          }
        },
        {
          "range": {
            "price": {
              "gte": 20,
              "lte": 100,
              "boost": 1.5
            }
          }
        },
        {
          "term": {
            "in_stock": {
              "value": true,
              "boost": 1.3
            }
          }
        },
        {
          "terms": {
            "category": ["jeans", "pants", "bottoms"],
            "boost": 1.2
          }
        }
      ],
      "filter": [
        {
          "range": {
            "price": {
              "gte": 10,
              "lte": 200
            }
          }
        },
        {
          "term": {
            "in_stock": true
          }
        },
        {
          "terms": {
            "season": ["summer", "all-season"]
          }
        }
      ],
      "minimum_should_match": 0
    }
  }
}`

const DEFAULT_OUTPUT = `name: item_booster
data: 
  item_dataset: 
    name: apparel_catalog
  index:
    search: 
      item_fields: 
        - name
        - description
queries: 
  search_products: 
    query:
      type: rank_items
      retrieve:
        - type: item_text_search
          mode: 
            type: lexical
          input_text_query: "Blue jeans for summer"
      score:
        type: score_ensemble
        name: boosted_ranking
        value_model: base
      reorder:
        - type: boosted
          name: featured_boost
          strength: 2.0
          retriever:
            type: "item_filter"
            filter: "tags = 'featured'"
        - type: boosted
          name: price_range_boost
          strength: 1.5
          retriever:
            type: "item_filter"
            filter: "price >= 20 AND price <= 100"
        - type: boosted
          name: in_stock_boost
          strength: 1.3
          retriever:
            type: "item_filter"
            filter: "in_stock = true"
        - type: boosted
          name: category_boost
          strength: 1.2
          retriever:
            type: "item_filter"
            filter: "category IN ('jeans', 'pants', 'bottoms')"`

export default function Home() {
  const [inputCode, setInputCode] = useState(DEFAULT_INPUT);
  const [outputCode, setOutputCode] = useState(DEFAULT_OUTPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const lineLengthInput = inputCode ? inputCode.split('\n').length : 0;
  const lineLengthOutput = outputCode ? outputCode.split('\n').length : 0;

  const handleSubmit = async () => {
    if (!inputCode.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/refactor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: inputCode }),
      });

      const data = await response.json();
      if (data.refactoredCode) {
        setOutputCode(data.refactoredCode);
        setIsLoading(false);
        setTimeout(() => setShowResult(true), 100);
      }
    } catch (error) {
      console.error("Error refactoring code:", error);
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-light-contrast text-center mb-8">
          Replace complex Elastic DSL with a single YAML file
        </h1>

        {
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Refactored Code
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/50 p-6 space-y-3 bg-linear-to-tr from-[#1C1531] to-[#0E0A19]">
                <div className="flex items-center justify-between">
                  <div className="flex-columns">
                  <h2 className="text-light-contrast text-lg tracking-wide">Original</h2>
                  <p className="text-light-contrast text-sm">{lineLengthInput} lines</p>
                  </div>
                  <Button onClick={handleSubmit}>
                    Run <>{isLoading ? <Spinner className="size-4"/>: <ArrowRight className="size-4" />}</>
                  </Button>
                </div>
                <div className="border-none bg-background rounded-md h-64 overflow-auto">
                  <Editor
                    value={inputCode}
                    onValueChange={setInputCode}
                    highlight={(code) => highlight(code, languages.json, "json")}
                    padding={12}
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      minHeight: "256px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    textareaClassName="border-none text-light-contrast font-mono resize-none focus:outline-none focus:ring-0"
                    preClassName="border-none m-0"
                    className="border-none text-light-contrast font-mono"
                  />
                </div>
              </Card>

              <Card className="p-6 space-y-3 border-primary/50 bg-linear-to-tl from-[#1C1531] to-[#0E0A19]">
                <div className="flex items-center justify-between">
                <div className="flex-columns">
                  <h3 className="text-light-contrast text-lg tracking-wide">Refactored</h3>
                  <p className="text-light-contrast text-sm">
                  {lineLengthOutput} lines
                  </p>
                  </div>
                </div>
                <div id="code-output" className="relative border-none h-64 bg-background rounded-md">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    className="absolute top-2 right-2 z-10 gap-2 text-light-contrast"
                    variant="ghost"
                  >
                    {copied ? (
                        <Check className="size-4" />
                    ) : (
                        <Copy className="size-4" />
                    )}
                  </Button>
                  <div className="h-full overflow-auto">
                    <Editor 
                      value={outputCode}
                      highlight={(code) => highlight(code, languages.yaml, "yaml")}
                      onValueChange={() => {}}
                      padding={12}
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        minHeight: "256px",
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      textareaClassName="border-none text-light-contrast font-mono resize-none focus:outline-none focus:ring-0 cursor-default"
                      preClassName="border-none m-0"
                      className="border-none text-light-contrast font-mono"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
