"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Copy, Check } from "lucide-react";

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

  const handleTextBoxChange = (e: any) => {
    setInputCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setOutputCode("");

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
        {/* {!showResult && (
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
        )} */}

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
                  <h2 className="text-light-contrast text-md tracking-wide">Original</h2>
                  <p className="text-light-contrast text-sm">{lineLengthInput} lines</p>
                  </div>
                  <Button onClick={handleSubmit}>
                    Run <>{isLoading ? <Spinner className="size-4"/>: <ArrowRight className="size-4" />}</>
                  </Button>
                </div>
                <Textarea
                  defaultValue={DEFAULT_INPUT}
                  id="code-input"
                  placeholder="// Paste your Elasticsearch query code here...&#10;const query = {&#10;  query: {&#10;    match: {&#10;      title: 'search term'&#10;    }&#10;  }&#10;};"
                  className="border-none text-light-contrast font-mono min-h-64 resize-none"
                  onChange={handleTextBoxChange}
                />
              </Card>

              <Card className="p-6 space-y-3 border-primary/50 bg-linear-to-tl from-[#1C1531] to-[#0E0A19]">
                <div className="flex items-center justify-between">
                <div className="flex-columns">
                  <h3 className="text-light-contrast text-md tracking-wide">Refactored</h3>
                  <p className="text-light-contrast text-sm">
                  {lineLengthOutput} lines
                  </p>
                  </div>
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    className="gap-2"
                  >
                    {copied ? (
                        <Check className="size-4" />
                    ) : (
                        <Copy className="size-4" />
                    )}
                  </Button>
                </div>
                <pre id="code-output" className="border-none h-64 bg-background p-4 rounded-md overflow-x-auto text-sm font-mono text-light-contrast max-h-[400px] overflow-y-auto">
                  {outputCode}
                </pre>
              </Card>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
