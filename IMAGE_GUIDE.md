# 📸 Image Guide — IT Yearbook 2026

All images go inside the `public/images/` folder.
The website uses **relative paths**, so images placed here are served automatically.

---

## 👤 Student Photos — `public/images/students/`

Each student needs **two photos**, named by their ID from `src/data/students.json`.

| File name       | What it shows            |
|-----------------|--------------------------|
| `001.jpg`       | Current portrait photo   |
| `001-child.jpg` | Childhood / baby photo   |
| `002.jpg`       | …                        |
| `002-child.jpg` | …                        |
| …               | (up to `020`)            |

> **Hover** on any student card to flip it and reveal the childhood photo. 👶

**Requirements:**
- Format: `.jpg` (preferred), `.png` also works — just rename the `src` in `StudentDirectory.tsx`
- Portrait aspect: roughly **2:3** (portrait orientation), e.g. 400×500 px
- Childhood: any aspect — it crops to fill the frame

---

## 📸 Memory Photos — `public/images/memories/`

Used on the **Memories Page** (polaroid scrapbook).

| File name     | Caption (from `memories.json`) |
|---------------|-------------------------------|
| `mem-01.jpg`  | First day orientation          |
| `mem-02.jpg`  | Hackathon 2023                 |
| `mem-03.jpg`  | Group project panic            |
| `mem-04.jpg`  | Campus vibes                   |
| `mem-05.jpg`  | Final year presentation        |
| `mem-06.jpg`  | Late night coding              |
| `mem-07.jpg`  | Internship day one             |
| `mem-08.jpg`  | Thesis submission              |
| `mem-09.jpg`  | The canteen table              |
| `mem-10.jpg`  | IT Department family           |
| `mem-11.jpg`  | Graduation rehearsal           |
| `mem-12.jpg`  | Last day on campus             |

> Edit captions anytime in `src/data/memories.json`.

---

## 🏛️ University Life Photos — `public/images/life/`

Used on the **University Life** magazine-style page.

| File name    | Label                  |
|--------------|------------------------|
| `life-01.jpg`| Hackathon 2023         |
| `life-02.jpg`| Internship Season      |
| `life-03.jpg`| Final Presentations    |
| `life-04.jpg`| Campus Life            |
| `life-05.jpg`| Project Crunch         |
| `life-06.jpg`| Graduation Day         |
| `life-07.jpg`| Study Groups           |
| `life-08.jpg`| Lab Sessions           |

---

## 🖼️ Class Memories — `public/images/class/`

Used on the **Class Memories** memory-wall page.

| File name      | Notes                      |
|----------------|----------------------------|
| `class-01.jpg` | Large feature photo        |
| `class-02.jpg` | …                          |
| …              | (up to `class-12.jpg`)     |

Any group photos, event shots, or candid campus moments work great here.

---

## 💡 Tips

- **Missing images** show a coloured gradient placeholder automatically — the site won't break.
- Recommended max size: **800 KB per photo** (the site is frontend-only, no compression).
- Use **square or portrait** crops for student cards, **landscape** for life/class photos.
- You can add more students by editing `src/data/students.json` and adding matching photo files.

---

## 📁 Final Folder Structure

```
public/
└── images/
    ├── students/
    │   ├── 001.jpg
    │   ├── 001-child.jpg
    │   ├── 002.jpg
    │   ├── 002-child.jpg
    │   └── … (up to 020)
    ├── memories/
    │   ├── mem-01.jpg
    │   └── … (up to mem-12)
    ├── life/
    │   ├── life-01.jpg
    │   └── … (up to life-08)
    └── class/
        ├── class-01.jpg
        └── … (up to class-12)
```
