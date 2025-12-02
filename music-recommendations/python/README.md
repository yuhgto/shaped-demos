# music recommendations with Shaped

### Setup

Create virtual env with python 3.11 and install shaped
```
python3.11 -m venv .venv
source ./.venv/bin/activate
pip install shaped
```

Now you can either:
- Clean original dataset using notebook, or
- Download the cleaned sample data from Shaped

### Create engine

We'll create a music recommendation service with: 
1. Next-track recommendation based on your history
2. Similar tracks
3. Playlist generation from history + a seed track