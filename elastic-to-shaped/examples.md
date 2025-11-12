# Example engine configs

These engine configs are copy-pasted into `/app/api/refactor/constants.ts` for use in the system prompt

## Boost based on tags, in_stock, category, price and featured

### Input: Elastic DSL

```json
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
```

### Output: Shaped engine config

```yaml
name: boosted_catalog_search
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
```

## Filter and sort without boosts

### Input: Elastic DSL

{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "description": "Blue jeans for summer"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "tags": "featured"
          }
        },
        {
          "range": {
            "price": {
              "gte": 20,
              "lte": 100
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
            "category": [
              "jeans",
              "pants",
              "bottoms"
            ]
          }
        },
        {
          "range": {
            "rating": {
              "gte": 4.0
            }
          }
        },
        {
          "term": {
            "brand": "Levis"
          }
        }
      ],
      "should": [
        {
          "term": {
            "on_sale": true
          }
        },
        {
          "range": {
            "discount": {
              "gte": 10
            }
          }
        }
      ]
    }
  },
  "sort": [
    { "price": "asc" },
    { "rating": "desc" }
  ],
  "size": 20,
  "_source": ["name", "price", "category", "brand", "rating", "tags", "on_sale"]
}


### Output: Shaped engine config

```yaml
name: filtered_product_search
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
      columns:
        - name
        - price
        - category
        - brand
        - rating
        - tags
        - on_sale
      retrieve:
        - type: item_text_search
          name: text_search
          mode:
            type: lexical
          input_text_query: "Blue jeans for summer"
          filter: "tags = 'featured' AND price >= 20 AND price <= 100 AND in_stock = true AND category IN ('jeans', 'pants', 'bottoms') AND rating >= 4.0 AND brand = 'Levis'"
      reorder:
        - type: boosted
          name: on_sale_boost
          strength: 1.0
          retriever:
            type: item_filter
            filter: "on_sale = true"
        - type: boosted
          name: discount_boost
          strength: 1.0
          retriever:
            type: item_filter
            filter: "discount >= 10"
        - type: item_column_order
          name: sort_by_price_rating
          columns:
            - name: price
              ascending: true
            - name: rating
              ascending: false
      limit: 20
```