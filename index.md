---
layout: default
title: Claude Code Plugins Official (ภาษาไทย)
description: รวมปลั๊กอินทางการของ Anthropic สำหรับ Claude Code — 35 ปลั๊กอินพร้อมข้อดี ข้อเสีย และลิงก์ official
---

# Claude Code Plugins Official — รวมปลั๊กอินทางการของ Anthropic 🔌

> เอกสารภาษาไทยสำหรับ Claude Code Plugin Marketplace อย่างเป็นทางการของ Anthropic — รวม 35 ปลั๊กอินภายในที่ Anthropic พัฒนาเอง พร้อมข้อดี ข้อเสีย และลิงก์ official

**Repository หลัก**: [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
**Marketplace manifest**: [`.claude-plugin/marketplace.json`](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json)
**License**: MIT

---

## สารบัญ

- [Claude Code Plugins Official คืออะไร?](#about)
- [วิธีติดตั้ง](#install)
- [หมวด 1: Language Server (LSP) — 12 ตัว](#cat-lsp)
- [หมวด 2: สร้างส่วนขยาย Claude Code — 5 ตัว](#cat-extend)
- [หมวด 3: ตรวจสอบคุณภาพโค้ด — 5 ตัว](#cat-quality)
- [หมวด 4: เขียน & Session — 3 ตัว](#cat-write)
- [หมวด 5: Output Style & UX — 3 ตัว](#cat-style)
- [หมวด 6: Setup & Workflow — 3 ตัว](#cat-setup)
- [หมวด 7: Demo & การศึกษา — 4 ตัว](#cat-demo)
- [สรุปตารางเลือกใช้](#summary-table)

---

## Claude Code Plugins Official คืออะไร? {#about}

Claude Code Plugins Official เป็น **plugin marketplace อย่างเป็นทางการ** ที่ Anthropic ดูแลเอง — เก็บปลั๊กอินคุณภาพสูงสำหรับขยายความสามารถของ Claude Code (เครื่องมือ CLI สำหรับการเขียนโปรแกรมร่วมกับ AI)

ปลั๊กอินใน marketplace แบ่งเป็น 2 ระดับ:

1. **Internal plugins** (35 ตัว) — Anthropic พัฒนาและดูแลเอง → อยู่ในโฟลเดอร์ `plugins/`
2. **External plugins** (15+ ตัว) — partner และชุมชนส่งเข้ามา → อยู่ในโฟลเดอร์ `external_plugins/`

ทุกปลั๊กอินใน marketplace ถูก **pin ด้วย git SHA** เพื่อความเสถียร — ไม่ใช่ floating-latest

---

## วิธีติดตั้ง {#install}

```bash
# 1. เพิ่ม marketplace
/plugin marketplace add anthropics

# 2. ติดตั้งปลั๊กอินทีละตัว
/plugin install <plugin-name>@claude-plugins-official

# 3. หรือเรียกดูทั้งหมดใน Claude Code
/plugin > Discover
```

---

## หมวด 1: Language Server (LSP) — 12 ตัว {#cat-lsp}

> ปลั๊กอินกลุ่มนี้ทำให้ Claude Code เข้าใจโค้ดในภาษานั้นๆ ได้ลึกขึ้น — go-to-definition, find references, diagnostics, refactoring suggestions

**หมายเหตุสำคัญ**: LSP plugins ทั้ง 12 ตัวไม่มี `plugin.json` ของตัวเอง — config ทั้งหมดอยู่ใน `marketplace.json` โดยตรง (declarative)

### 1.1 clangd-lsp — C/C++

ปลั๊กอินสำหรับภาษา C/C++ โดยใช้ clangd (language server ของ LLVM)

- **ข้อดี**: ทำให้ Claude เข้าใจ header, macro, template ได้ลึก; รองรับ C, C++, Objective-C
- **ข้อเสีย**: ต้องติดตั้ง clangd แยก; ต้องมี `compile_commands.json` เพื่อทำงานเต็มประสิทธิภาพ
- 🔗 **Official**: [plugins/clangd-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/clangd-lsp)

### 1.2 csharp-lsp — C#

ปลั๊กอินสำหรับภาษา C#

- **ข้อดี**: รองรับ .NET ecosystem; ทำงานกับ MSBuild projects ได้ดี
- **ข้อเสีย**: ต้องติดตั้ง .NET SDK แยก; กิน RAM พอสมควรเมื่อ project ใหญ่
- 🔗 **Official**: [plugins/csharp-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/csharp-lsp)

### 1.3 gopls-lsp — Go

ปลั๊กอินสำหรับภาษา Go โดยใช้ gopls (official Go language server)

- **ข้อดี**: gopls เป็น LSP มาตรฐานของ Go; รวดเร็วและเสถียร
- **ข้อเสีย**: ต้องติดตั้ง Go toolchain ก่อน
- 🔗 **Official**: [plugins/gopls-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/gopls-lsp)

### 1.4 jdtls-lsp — Java

ปลั๊กอินสำหรับภาษา Java โดยใช้ Eclipse JDT.LS

- **ข้อดี**: รองรับ Maven, Gradle; เข้าใจ Java type system ครบถ้วน
- **ข้อเสีย**: เริ่มต้นช้า (cold start); ต้องมี Java JDK
- 🔗 **Official**: [plugins/jdtls-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/jdtls-lsp)

### 1.5 kotlin-lsp — Kotlin

ปลั๊กอินสำหรับภาษา Kotlin

- **ข้อดี**: รองรับ Android development; เข้าใจ Kotlin DSL
- **ข้อเสีย**: ยังพัฒนาอยู่; บางครั้งช้าใน project ขนาดใหญ่
- 🔗 **Official**: [plugins/kotlin-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/kotlin-lsp)

### 1.6 lua-lsp — Lua

ปลั๊กอินสำหรับภาษา Lua

- **ข้อดี**: เหมาะกับ Neovim config, game scripting (Love2D), embedded systems
- **ข้อเสีย**: type inference ใน Lua ทำได้จำกัด เพราะภาษาเป็น dynamically typed
- 🔗 **Official**: [plugins/lua-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/lua-lsp)

### 1.7 php-lsp — PHP

ปลั๊กอินสำหรับภาษา PHP โดยใช้ Intelephense

- **ข้อดี**: รองรับ Laravel, WordPress, Composer projects
- **ข้อเสีย**: Intelephense เวอร์ชัน premium มี features เพิ่มที่ไม่อยู่ใน LSP นี้
- 🔗 **Official**: [plugins/php-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/php-lsp)

### 1.8 pyright-lsp — Python

ปลั๊กอินสำหรับภาษา Python โดยใช้ Pyright (Microsoft) — เน้น type checking

- **ข้อดี**: type inference แม่นยำที่สุดในบรรดา Python LSPs; เร็ว
- **ข้อเสีย**: เคร่งเรื่อง type hints — ถ้าโค้ดไม่มี type จะได้ประโยชน์น้อย
- 🔗 **Official**: [plugins/pyright-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pyright-lsp)

### 1.9 ruby-lsp — Ruby

ปลั๊กอินสำหรับภาษา Ruby

- **ข้อดี**: รองรับ Rails projects; พัฒนาโดย Shopify (ใช้ในงาน production จริง)
- **ข้อเสีย**: Ruby เป็น dynamically typed มาก — autocomplete บางครั้งคาดเดาผิด
- 🔗 **Official**: [plugins/ruby-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ruby-lsp)

### 1.10 rust-analyzer-lsp — Rust

ปลั๊กอินสำหรับภาษา Rust โดยใช้ rust-analyzer (official)

- **ข้อดี**: เข้าใจ ownership, lifetimes, trait bounds; วิเคราะห์ macros ได้
- **ข้อเสีย**: กิน RAM เยอะใน project ใหญ่; ใช้เวลา indexing นาน
- 🔗 **Official**: [plugins/rust-analyzer-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/rust-analyzer-lsp)

### 1.11 swift-lsp — Swift

ปลั๊กอินสำหรับภาษา Swift โดยใช้ SourceKit-LSP (Apple)

- **ข้อดี**: รองรับ iOS, macOS development; เข้าใจ SwiftUI
- **ข้อเสีย**: ทำงานได้ดีบน macOS เป็นหลัก — บน Linux จะมีฟีเจอร์น้อยกว่า
- 🔗 **Official**: [plugins/swift-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/swift-lsp)

### 1.12 typescript-lsp — TypeScript / JavaScript

ปลั๊กอินสำหรับ TypeScript และ JavaScript

- **ข้อดี**: ใช้ tsserver ของ Microsoft โดยตรง; รองรับ React, Vue, Node.js
- **ข้อเสีย**: project ใหญ่ๆ (monorepo) อาจจะช้าและกิน RAM
- 🔗 **Official**: [plugins/typescript-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/typescript-lsp)

---

## หมวด 2: สร้างส่วนขยาย Claude Code — 5 ตัว {#cat-extend}

> ปลั๊กอินกลุ่มนี้ช่วย **สร้าง** ปลั๊กอิน, skill, hook, MCP server ของตัวเอง — เหมาะสำหรับนักพัฒนาที่อยากขยาย Claude Code

### 2.1 plugin-dev — ชุดเครื่องมือสร้างปลั๊กอินครบวงจร

รวม 7 expert skills + agent guidance สำหรับสร้างปลั๊กอินตั้งแต่ต้นจนจบ

- **ข้อดี**: ครอบคลุมทุกประเด็น — agents, commands, hooks, MCP, manifest; เหมาะที่จะเริ่มจากตัวนี้
- **ข้อเสีย**: ข้อมูลเยอะ ต้องอ่านนาน; เหมาะกับคนที่จะลงทุนสร้างปลั๊กอินจริงๆ
- 🔗 **Official**: [plugins/plugin-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/plugin-dev)

### 2.2 skill-creator — สร้างและประเมิน skill

ช่วยสร้าง skill ใหม่, ปรับปรุง skill เดิม, และ benchmark performance ของ skill

- **ข้อดี**: มี eval workflow ในตัว — วัดผลได้จริง ไม่ใช่แค่เขียนเสร็จแล้วจบ
- **ข้อเสีย**: workflow ค่อนข้างซับซ้อน — มี script และ reference เยอะ
- 🔗 **Official**: [plugins/skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator)

### 2.3 hookify — สร้าง custom hooks

วิเคราะห์ pattern ใน conversation แล้วสร้าง hook ที่ป้องกันพฤติกรรมไม่พึงประสงค์ของ AI

- **ข้อดี**: automation ที่ทำงานเองอัตโนมัติ — ไม่ต้องคอยเตือน Claude ทุกครั้ง
- **ข้อเสีย**: hook ที่เขียนผิดอาจ block การทำงาน — ต้อง test ให้ดี (แม้ Anthropic จะออกแบบให้ fail open)
- 🔗 **Official**: [plugins/hookify](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/hookify)

### 2.4 mcp-server-dev — สร้าง MCP server

แนะนำการออกแบบและสร้าง MCP (Model Context Protocol) server เพื่อเชื่อม Claude กับระบบภายนอก

- **ข้อดี**: ครอบคลุม deployment models (remote HTTP, MCPB, local), tool design, auth
- **ข้อเสีย**: ต้องเข้าใจ MCP protocol ก่อน — ไม่เหมาะกับมือใหม่ Claude Code
- 🔗 **Official**: [plugins/mcp-server-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev)

### 2.5 agent-sdk-dev — ใช้ Claude Agent SDK

ชุดเครื่องมือสำหรับสร้าง agent แบบ programmatic ด้วย Claude Agent SDK

- **ข้อดี**: สร้าง sub-agent ได้แบบเขียนโค้ด — ไม่ใช่แค่เรียก Claude API ตรงๆ
- **ข้อเสีย**: ต้องเขียนโค้ดเพิ่ม; เหมาะกับงาน automation ที่ใหญ่ขึ้น
- 🔗 **Official**: [plugins/agent-sdk-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/agent-sdk-dev)

---

## หมวด 3: ตรวจสอบคุณภาพโค้ด — 5 ตัว {#cat-quality}

> กลุ่ม code review, refactoring, security audit

### 3.1 code-review — Multi-agent PR review

สั่ง agent 5 ตัวทำงานขนาน (parallel Sonnet) แล้วใช้ Haiku ประเมินความมั่นใจ — รวมเป็น review เดียว

- **ข้อดี**: ตัวอย่าง multi-agent orchestration ที่สวยที่สุดใน marketplace; รีวิวลึก รอบด้าน
- **ข้อเสีย**: ใช้ token เยอะ (5 agents ทำงานพร้อมกัน); ค่าใช้จ่ายสูงกว่า single-agent review
- 🔗 **Official**: [plugins/code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review)

### 3.2 pr-review-toolkit — Agent ผู้เชี่ยวชาญเฉพาะด้าน

มี agent หลายตัวสำหรับงานเฉพาะ — comment quality, test coverage, error handling, type design, code quality

- **ข้อดี**: ยืดหยุ่น — เรียกใช้เฉพาะ agent ที่ต้องการ; แต่ละตัวมี confidence score 0-100
- **ข้อเสีย**: ต้องรู้ว่าจะใช้ agent ไหนเมื่อไหร่ — มี learning curve
- 🔗 **Official**: [plugins/pr-review-toolkit](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pr-review-toolkit)

### 3.3 code-simplifier — ทำให้โค้ดอ่านง่ายขึ้น

Agent ที่ refactor โค้ดให้ชัดเจน เข้าใจง่าย ลดความซับซ้อน

- **ข้อดี**: เหมาะกับ legacy code ที่อ่านยาก; ลด cognitive load
- **ข้อเสีย**: "ง่าย" เป็นเรื่องอัตวิสัย — บางครั้ง AI ทำให้ over-abstract เกินไป
- 🔗 **Official**: [plugins/code-simplifier](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier)

### 3.4 code-modernization — ปรับโค้ดเก่าให้ทันสมัย

Multi-agent workflow: assess → map → transform → harden สำหรับ COBOL, Java เก่า, C++ เก่า, monolith webapps

- **ข้อดี**: เหมาะกับงาน migration ใหญ่ๆ ที่ปกติใช้เวลาเป็นเดือน; มี workflow ชัดเจน
- **ข้อเสีย**: ต้องมีโค้ดเก่าจริงๆ ถึงจะคุ้ม; ไม่เหมาะกับ project เล็ก
- 🔗 **Official**: [plugins/code-modernization](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-modernization)

### 3.5 security-guidance — เตือนเรื่อง security ระหว่างเขียน

Hook ที่ตรวจจับ injection, XSS, unsafe code ขณะแก้ไฟล์

- **ข้อดี**: ทำงานเองอัตโนมัติ — ไม่ต้องคอยถาม; ป้องกันก่อนเกิดปัญหา
- **ข้อเสีย**: อาจมี false positives; ไม่ใช่ security audit ที่สมบูรณ์
- 🔗 **Official**: [plugins/security-guidance](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance)

---

## หมวด 4: เขียน & Session — 3 ตัว {#cat-write}

### 4.1 commit-commands — Git workflow อัตโนมัติ

Slash commands สำหรับ commit, push, สร้าง PR — ทำให้ git workflow เร็วขึ้น

- **ข้อดี**: ลด typing; commit message ดีขึ้น (AI เขียนให้)
- **ข้อเสีย**: ต้องรีวิวก่อน commit จริง — AI อาจสรุปผิด
- 🔗 **Official**: [plugins/commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands)

### 4.2 claude-md-management — จัดการ CLAUDE.md

ตรวจสอบและปรับปรุง CLAUDE.md (ไฟล์คำสั่งสำหรับ Claude Code ในแต่ละ project)

- **ข้อดี**: CLAUDE.md ที่ดี = AI ทำงานตรงใจมากขึ้น; ช่วยจับ pattern จาก session
- **ข้อเสีย**: ถ้า CLAUDE.md ใหญ่เกิน — ใช้ token เปล่าทุก session
- 🔗 **Official**: [plugins/claude-md-management](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management)

### 4.3 session-report — รายงาน session แบบ HTML

สร้างรายงาน HTML ที่ explore ได้ — token usage, cache analysis, conversation flow

- **ข้อดี**: เห็นภาพรวมของ session ได้ดี; วิเคราะห์ค่าใช้จ่าย token ได้
- **ข้อเสีย**: เป็น tool หลังบ้าน — ไม่ได้ช่วยตอนทำงานจริง
- 🔗 **Official**: [plugins/session-report](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/session-report)

---

## หมวด 5: Output Style & UX — 3 ตัว {#cat-style}

### 5.1 explanatory-output-style — อธิบายเหตุผลทุกครั้ง

SessionStart hook ที่ใส่ context ให้ Claude อธิบายว่าทำไมถึงเลือกแบบนั้นๆ

- **ข้อดี**: เรียนรู้จากการทำงานของ AI; เหมาะกับมือใหม่
- **ข้อเสีย**: คำตอบยาวขึ้นทุกครั้ง — ใช้ token เยอะกว่า
- 🔗 **Official**: [plugins/explanatory-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/explanatory-output-style)

### 5.2 learning-output-style — โหมดเรียนรู้แบบโต้ตอบ

ผสม explanatory + interactive — บางครั้ง Claude จะให้คุณลองเขียนเองก่อนเฉลย

- **ข้อดี**: เหมาะกับการเรียนรู้ภาษาใหม่หรือ pattern ใหม่
- **ข้อเสีย**: ช้าลง — ไม่เหมาะถ้าต้องการแค่ "ทำให้เสร็จ"
- 🔗 **Official**: [plugins/learning-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/learning-output-style)

### 5.3 frontend-design — สร้าง UI/UX ระดับ production

Skill ที่รวม design patterns และ component libraries สำหรับ frontend

- **ข้อดี**: ออกแบบ UI ได้คุณภาพมาตรฐาน production; ไม่ต้องเริ่มจากศูนย์
- **ข้อเสีย**: ใหญ่ — โหลด context เยอะ; ไม่เหมาะกับงานเล็ก
- 🔗 **Official**: [plugins/frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)

---

## หมวด 6: Setup & Workflow — 3 ตัว {#cat-setup}

### 6.1 claude-code-setup — แนะนำการ setup อัตโนมัติ

วิเคราะห์ codebase แล้วแนะนำว่าควรเพิ่ม hook, skill, MCP server อะไรบ้าง

- **ข้อดี**: ดี for เริ่มต้น project ใหม่; ค้นพบ tools ที่ไม่รู้ว่ามี
- **ข้อเสีย**: แค่ recommendation — ต้องเลือกใช้เองอยู่ดี
- 🔗 **Official**: [plugins/claude-code-setup](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup)

### 6.2 feature-dev — Workflow สำหรับสร้าง feature

มี agent หลายตัวสำหรับ exploration, architecture design, code review

- **ข้อดี**: ครอบคลุมตั้งแต่วางแผนถึงเขียน; เหมาะกับ feature ใหม่ที่ซับซ้อน
- **ข้อเสีย**: overkill สำหรับ feature เล็กๆ
- 🔗 **Official**: [plugins/feature-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev)

### 6.3 ralph-loop — Self-referential AI loop

Hook + command สำหรับให้ AI วนทำงานเองอัตโนมัติ (while-true loop)

- **ข้อดี**: automation เต็มรูปแบบ — เหมาะกับงาน iterative
- **ข้อเสีย**: ต้องระวังเรื่อง runaway loop; ค่าใช้จ่ายอาจเพิ่มเร็วถ้าไม่ระวัง
- 🔗 **Official**: [plugins/ralph-loop](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop)

---

## หมวด 7: Demo & การศึกษา — 4 ตัว {#cat-demo}

### 7.1 example-plugin — ตัวอย่างปลั๊กอินที่สมบูรณ์

แสดง feature ทุกอย่างของ plugin — commands, skills, hooks ในไฟล์เดียว

- **ข้อดี**: ดีที่สุดสำหรับเริ่มเรียนรู้; โค้ดสะอาด อ่านง่าย
- **ข้อเสีย**: เป็นแค่ demo — ไม่ได้ทำงานจริง
- 🔗 **Official**: [plugins/example-plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/example-plugin)

### 7.2 playground — สร้าง HTML playground แบบ interactive

Skill สำหรับสร้าง single-file HTML explorer ที่มี live preview

- **ข้อดี**: สร้าง demo เร็ว; แชร์เป็นไฟล์เดียวได้
- **ข้อเสีย**: เหมาะกับ demo เล็กๆ เท่านั้น — ไม่ใช่ production tool
- 🔗 **Official**: [plugins/playground](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground)

### 7.3 math-olympiad — แก้โจทย์คณิตศาสตร์ระดับสูง

แก้ปัญหาแบบ IMO, Putnam, USAMO โดยใช้ adversarial verification

- **ข้อดี**: รวม adversarial verification — ตรวจคำตอบลึก
- **ข้อเสีย**: เฉพาะทางมาก — เหมาะกับคนที่ทำโจทย์คณิตจริงๆ
- 🔗 **Official**: [plugins/math-olympiad](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/math-olympiad)

### 7.4 cwc-makers — Onboarding สำหรับ M5Stack Cardputer

ตั้งค่า hardware M5Stack Cardputer สำหรับงาน "Code-with-Claude"

- **ข้อดี**: เฉพาะทาง — เหมาะกับคนที่ใช้ฮาร์ดแวร์ M5Stack
- **ข้อเสีย**: ใช้ได้กับฮาร์ดแวร์รุ่นเฉพาะเท่านั้น
- 🔗 **Official**: [plugins/cwc-makers](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/cwc-makers)

---

## สรุปตารางเลือกใช้ {#summary-table}

ใช้ตารางนี้เพื่อตอบคำถาม **"ฉันต้องการ... ใช้ปลั๊กอินไหน?"**

| ความต้องการ | ใช้ปลั๊กอิน |
|--------------|-------------|
| รองรับภาษา Python | [pyright-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pyright-lsp) |
| รองรับภาษา TypeScript / JavaScript | [typescript-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/typescript-lsp) |
| รองรับภาษา Go | [gopls-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/gopls-lsp) |
| รองรับภาษา Rust | [rust-analyzer-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/rust-analyzer-lsp) |
| Review PR ด้วย multi-agent | [code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review) หรือ [pr-review-toolkit](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pr-review-toolkit) |
| สร้าง Claude Code plugin ของตัวเอง | [plugin-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/plugin-dev) + [skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) |
| เชื่อม Claude กับ external API | [mcp-server-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev) |
| Automate workflow ตาม event | [hookify](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/hookify) |
| ตั้งค่า CLAUDE.md ให้ดี | [claude-md-management](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management) |
| Git commit / PR ให้เร็วขึ้น | [commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands) |
| ให้ Claude อธิบายงานที่ทำ | [explanatory-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/explanatory-output-style) |
| เรียนรู้ขณะเขียนโค้ด | [learning-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/learning-output-style) |
| Modernize โค้ดเก่า (COBOL, legacy Java) | [code-modernization](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-modernization) |
| เตือน security ระหว่างเขียน | [security-guidance](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance) |
| วิเคราะห์ token usage ของ session | [session-report](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/session-report) |
| ดูตัวอย่าง plugin แบบ end-to-end | [example-plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/example-plugin) |
| สร้าง interactive HTML demo | [playground](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground) |

---

## ทรัพยากรเพิ่มเติม

- **Repository**: [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
- **Marketplace manifest**: [`marketplace.json`](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json)
- **Claude Code documentation**: [docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code)
- **External plugins folder**: [`external_plugins/`](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins)

---

<div style="text-align: center; color: #666; font-size: 0.9em; margin-top: 2em;">
เอกสารนี้สรุปจากการศึกษาด้วย Claude Code · ปรับปรุงครั้งล่าสุด 2026-05-11
</div>
