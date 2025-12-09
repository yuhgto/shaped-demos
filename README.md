# shaped-demos
A set of demo applications for the Shaped Relevance Engine

<p>
  These sample apps demonstrate what you can build with the Shaped Relevance Engine and showcase different use cases and features. As reference apps, they are not intended for production, but are a great way to learn how to implement search, recommendations, and personalization with Shaped.
</p>

<table>
<tr>
  <!-- Document Search -->
  <td width="50%" valign="top">
    <h2><a href="document-search">Document Search</a></h2>
      <p>
        Search for Recsys articles in the Shaped blog using hybrid search.
      </p>
    <br/>
    <details>
      <summary><b>📕 Description and Features</b></summary>
      <p>An example that shows how to do hybrid search using Shaped. Demonstrates how to implement a sentence transformer model combined with BM25 indexes to query using text content.</p>
      <b>Use Cases</b><br/>
      <p>
        Search bar on a website, RAG (Retrieval-Augmented Generation) applications
      </p>
      <b>Features</b><br/>
      <p>
        <code>Hybrid Search</code>, <code>Sentence Transformers</code>, <code>BM25</code>, <code>Text Search</code>
      </p>
    </details>
  </td>
  <!-- Elastic to Shaped -->
  <td valign="top">
    <h2><a href="elastic-to-shaped">Elastic to Shaped</a></h2>
    <p>Convert Elasticsearch queries into simpler Shaped queries.</p>
    <br/>
    <details>
      <summary><b>📕 Description and Features</b></summary>
      <p>A migration assistant to convert Elastic queries to Shaped. Uses an LLM with context to convert Elastic DSL queries into ShapedQL, making it easy to migrate from Elasticsearch to Shaped.</p>
      <b>Features</b><br/>
      <p>
        <code>Query Conversion</code>, <code>LLM Integration</code>, <code>Migration Tool</code>, <code>Elastic DSL</code>
      </p>
    </details>
  </td>
</tr>
<tr>
  <!-- Fashion Catalog -->
  <td width="50%" valign="top">
    <h2><a href="fashion-catalog">Fashion Catalog</a></h2>
    <p>A fashion e-commerce site powered by Shaped.</p>
    <br/>
    <details>
      <summary><b>📕 Description and Features</b></summary>
      <p>A catalog of fashion items demonstrating personalization and complement item recommendations. Shows how to build an e-commerce experience with personalized product recommendations based on user interactions and cart contents.</p>
      <b>Features</b><br/>
      <p>
        <code>Product Catalog</code>, <code>Personalization</code>, <code>Complement Items</code>, <code>Similar Items</code>, <code>Cart-based Recommendations</code>
      </p>
    </details>
  </td>
  <!-- Movie Recommendations -->
  <td valign="top">
    <h2><a href="movie-recommendations">Movie Recommendations</a></h2>
    <p>Netflix-style content carousels with recommendations powered by Shaped.</p>
    <br/>
    <details>
      <summary><b>📕 Description and Features</b></summary>
      <p>A complete movie recommendation system demonstrating personalized feeds, similar items, and personalization based on user interactions. Built with Next.js frontend and Shaped backend, showcasing how to retrieve personalized movie recommendations and track user interactions.</p>
      <b>Features</b><br/>
      <p>
        <code>Personalized Recommendations</code>, <code>Similar Items</code>, <code>User Interactions</code>, <code>MovieLens Dataset</code>, <code>Next.js</code>
      </p>
      <b><a href="https://movies.shaped.ai">Live Demo</a></b>
    </details>
  </td>
</tr>
</table>
