# Claude Code Plugins Official — Thai Edition 🇹🇭

เว็บไซต์รวบรวมปลั๊กอินทางการของ Anthropic สำหรับ Claude Code (ภาษาไทย) — พร้อม deploy บน GitHub Pages

**🌐 ตัวอย่าง URL หลัง deploy**: `https://<your-username>.github.io/<repo-name>/`

---

## 📁 โครงสร้างไฟล์

```
claude-plugins-thai-site/
├── _config.yml      # การตั้งค่า Jekyll (theme, title)
├── index.md         # หน้าหลัก — เนื้อหา 35 plugins
├── README.md        # ไฟล์นี้ (excluded จาก site build)
└── .gitignore       # ไฟล์ที่ git ไม่ track
```

ใช้ **theme**: `jekyll-theme-cayman` (theme ทางการของ GitHub Pages — clean, modern, รองรับภาษาไทยดี)

---

## 🚀 วิธี Deploy (3 วิธี)

### วิธีที่ 1: GitHub Web UI (ง่ายที่สุด ไม่ต้องใช้ git)

1. ไปที่ [github.com/new](https://github.com/new)
2. ตั้งชื่อ repo เช่น `claude-plugins-thai` (เลือก **Public** เพราะ GitHub Pages ฟรีต้อง public)
3. กด **Create repository**
4. ในหน้า repo ใหม่ → กด **"uploading an existing file"**
5. ลากไฟล์ทั้ง 4 ไฟล์ (`_config.yml`, `index.md`, `.gitignore`, `README.md`) เข้าไป
6. กด **Commit changes**
7. ไปที่ **Settings → Pages**
8. ใต้ **Source** เลือก **"Deploy from a branch"**
9. เลือก **Branch: `main`**, **Folder: `/ (root)`** → กด **Save**
10. รอประมาณ 1-2 นาที → GitHub จะแสดง URL ของเว็บ
11. เปิด URL เช่น `https://<your-username>.github.io/claude-plugins-thai/`

### วิธีที่ 2: ใช้ Git Command Line

```bash
# 1. คัดลอกโฟลเดอร์นี้ไปที่อื่น (ออกจาก apex-oracle)
cp -r ψ/lab/claude-plugins-thai-site ~/claude-plugins-thai
cd ~/claude-plugins-thai

# 2. สร้าง repo ใหม่บน GitHub ก่อน (ผ่าน github.com/new) — อย่าเพิ่ม README

# 3. Init และ push
git init
git add .
git commit -m "Initial: Thai Claude Code Plugins documentation"
git branch -M main
git remote add origin https://github.com/<your-username>/claude-plugins-thai.git
git push -u origin main

# 4. เปิด GitHub Pages
# ไปที่ Settings → Pages → Source: Deploy from a branch → main / root → Save
```

### วิธีที่ 3: ใช้ GitHub CLI (`gh`)

```bash
cp -r ψ/lab/claude-plugins-thai-site ~/claude-plugins-thai
cd ~/claude-plugins-thai

gh repo create claude-plugins-thai --public --source=. --remote=origin
git add . && git commit -m "Initial commit"
git push -u origin main

# เปิด GitHub Pages ผ่าน CLI
gh api repos/:owner/claude-plugins-thai/pages -X POST -f source[branch]=main -f source[path]=/
```

---

## ⚙️ ปรับแต่งเพิ่มเติม

### เปลี่ยน Theme

แก้ไฟล์ `_config.yml` บรรทัด `theme:` เป็น theme อื่น (ที่ GitHub Pages รองรับ):

| Theme | ลักษณะ |
|-------|--------|
| `jekyll-theme-cayman` ✅ (default) | สมัยใหม่ มี hero banner |
| `jekyll-theme-minimal` | เรียบง่าย เหมาะกับ docs |
| `jekyll-theme-architect` | ตัวอักษรใหญ่ อ่านสบาย |
| `jekyll-theme-slate` | โทนเข้ม Professional |
| `jekyll-theme-hacker` | สไตล์ terminal สีเขียว |
| `jekyll-theme-midnight` | Dark mode |
| `minima` | Theme default ของ Jekyll |

ดูตัวอย่างทั้งหมด: [pages.github.com/themes](https://pages.github.com/themes/)

### เปลี่ยน Title / Description

แก้ที่ `_config.yml`:

```yaml
title: ชื่อเว็บของคุณ
description: คำอธิบายสั้นๆ
```

### เพิ่มหน้าใหม่

สร้างไฟล์ `.md` ใหม่ในโฟลเดอร์ root เช่น `about.md`:

```markdown
---
layout: default
title: เกี่ยวกับเรา
---

# เกี่ยวกับเรา

เนื้อหา...
```

จะเข้าได้ที่ `<your-url>/about/`

### ใช้ Custom Domain

ในหน้า Settings → Pages → **Custom domain** ใส่ domain เช่น `plugins.yourdomain.com`
แล้วตั้ง DNS CNAME ชี้ไปที่ `<username>.github.io`

---

## 🔍 ทดสอบ Local ก่อน Deploy (Optional)

ถ้าต้องการดูเว็บก่อน push ขึ้น GitHub:

```bash
# ติดตั้ง Ruby + Jekyll (ครั้งเดียว)
sudo apt install ruby-full build-essential   # Ubuntu/WSL
gem install bundler jekyll

# สร้าง Gemfile
echo 'source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins' > Gemfile

bundle install
bundle exec jekyll serve

# เปิดเบราเซอร์ที่ http://localhost:4000
```

---

## 📋 Checklist หลัง Deploy

- [ ] เปิด URL แล้วโหลดได้
- [ ] ตรวจสอบว่าภาษาไทยแสดงผลถูกต้อง
- [ ] ทดสอบลิงก์ในสารบัญ (ควร scroll ไปยังหัวข้อที่ตรงกัน)
- [ ] ทดสอบลิงก์ official ของแต่ละ plugin ว่าใช้งานได้
- [ ] ดูบนมือถือว่า responsive

---

## 🐛 Troubleshooting

**Q: Deploy แล้ว 404 not found**
- ตรวจสอบว่าเลือก branch ถูก (`main`) และ folder = `/ (root)`
- รอ 2-3 นาที (build ใช้เวลา)
- เช็คที่ Settings → Pages ว่ามี URL สีเขียวขึ้นหรือยัง

**Q: ภาษาไทยเป็นกล่อง หรือไม่แสดง**
- Theme cayman ใช้ font Open Sans ซึ่งรองรับภาษาไทย
- ถ้ายังเพี้ยน ลองเปลี่ยน theme เป็น `jekyll-theme-minimal` หรือ `minima`

**Q: ลิงก์ในสารบัญไม่ทำงาน**
- ตรวจสอบว่า heading ID ใน `index.md` (`{#about}` ฯลฯ) ตรงกับ `#about` ในลิงก์

**Q: อยากเพิ่ม Google Analytics**
- เพิ่มใน `_config.yml`:
  ```yaml
  google_analytics: UA-XXXXX-X
  ```

---

## 📜 License

เนื้อหาในเอกสารนี้เป็นการสรุปจาก [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (MIT License)

เอกสารแปล/สรุปนี้แชร์ภายใต้ [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — นำไปใช้/ดัดแปลง/แชร์ต่อได้ ขอแค่ให้เครดิตต้นทาง

---

> สร้างด้วย ❤️ และ Claude Code · 2026-05-11
