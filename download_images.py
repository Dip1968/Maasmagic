import os
import requests

queries = {
    "khakhra": "khakhra.png",
    "papadum": "papad.png", # Using generic papadum for papad
    "sev snack": "sev.png",
    "sabudana": "sabudana_vadi.png",
    "chivda": "chevado.png", # Chevda/chivda
    "puri food": "farsi_puri.png",
    "shakkarpara": "shakkarpara_sweet.png",
    "namak pare": "shakkarpara.png",
    "sev snack": "chana_sev.png",
    "poha": "chipatpauva.png",
    "potato chips": "bataka_wafer.png"
}

output_dir = "public/images"
os.makedirs(output_dir, exist_ok=True)

for query, filename in queries.items():
    print(f"Searching wikimedia for {query}...")
    url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch={query}&pithumbsize=800"
    try:
        resp = requests.get(url, headers={"User-Agent": "MyCustomBot/1.0 (test@test.com)"}).json()
        pages = resp.get("query", {}).get("pages", {})
        
        downloaded = False
        for page_id, page_info in pages.items():
            if "thumbnail" in page_info:
                img_url = page_info["thumbnail"]["source"]
                print(f"  Downloading from {img_url}")
                img_resp = requests.get(img_url, headers={"User-Agent": "MyCustomBot/1.0 (test@test.com)"})
                if img_resp.status_code == 200:
                    with open(os.path.join(output_dir, filename), "wb") as f:
                        f.write(img_resp.content)
                    print(f"  Saved {filename}")
                    downloaded = True
                    break
        if not downloaded:
            print(f"  No image found for {query}")
    except Exception as e:
        print(f"Error for {query}: {e}")

print("Done")
