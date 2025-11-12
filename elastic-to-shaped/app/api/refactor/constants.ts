export const documentation = `
The structure of the YAML should  have this shape: 

json\`\`\`
{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_dataset": {
      "name": "string",
      "query_id": "string",
      "query": "string",
      "path": "string",
      "is_transform": false
    },
    "user_dataset": {
      "name": "string",
      "query_id": "string",
      "query": "string",
      "path": "string",
      "is_transform": false
    },
    "item_dataset": {
      "name": "string",
      "query_id": "string",
      "query": "string",
      "path": "string",
      "is_transform": false
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "RatingLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "index": {
      "search": {
        "tokenizer": {
          "language": "en",
          "stemming": true,
          "ascii_folding": true,
          "remove_stop_words": true,
          "type": "stemmer"
        },
        "user_fields": [
          "string"
        ],
        "item_fields": [
          "string"
        ]
      },
      "embeddings": [
        {
          "name": "string",
          "encoder": {
            "model_name": "string",
            "user_fields": [
              "string"
            ],
            "item_fields": [
              "string"
            ],
            "type": "hugging_face",
            "_real_time_attribute_encoding": true
          }
        }
      ]
    },
    "filters": [
      {
        "name": "string",
        "filter_dataset": {
          "name": "string",
          "query_id": "string",
          "query": "string",
          "path": "string",
          "is_transform": false
        },
        "type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "base"
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "server": {
      "worker_count": 1
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "filter": "string",
            "limit": 100,
            "name": "string",
            "type": "item_column_order",
            "_return_entity": "item"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": "string",
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "filter": "string",
              "limit": 100,
              "name": "string",
              "type": "item_column_order",
              "_return_entity": "item"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank_users",
        "_return_entity": "user"
      },
      "params": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "filter": "string",
            "limit": 100,
            "name": "string",
            "type": "item_column_order",
            "_return_entity": "item"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": "string",
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "filter": "string",
              "limit": 100,
              "name": "string",
              "type": "item_column_order",
              "_return_entity": "item"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank_users",
        "_return_entity": "user"
      },
      "params": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}
  \`\`\``

  export const systemPrompt = `
    ## Instructions
    You are a senior engineer who works on Elasticsearch retrieval systems. You have been given the following ElasticSearch DSL to convert to an engine config with the Shaped Ranking API. 
    Use the "Attached documentation" to understand the Shaped API schema. Then, convert the "Input Code" to a Shaped Engine configuration. 
    The input code may be any language, including Elastic DSL, Go, Javascript, Python, etc. 

    The Engine Configuration should not include the "queries" key, for conciseness. 

    If the input is code, your output should be YAML-formatted key-value pairs. Do not include any comments or additional markup.

    If the input is not code, you should output an error message - "No code was included in the input"

    ## Documentation: 
    ${documentation}

    ## Examples

### Boost based on tags, in_stock, category, price and featured

#### Input: Elastic DSL

\`\`\`json
{
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
}
\`\`\`

#### Output: Shaped engine config

\`\`\`yaml
name: item_booster
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
            filter: "category IN ('jeans', 'pants', 'bottoms')"
\`\`\`
`