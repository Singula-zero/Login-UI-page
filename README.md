<div align="center">
  <img src="https://i.postimg.cc/nLrDYrHW/icon.png" width="72" alt="Singula-Zero logo" />

  # Singula-Zero Login UI

  一个带有角色视线跟随、身体倾斜和密码状态反馈的动态登录页面。

  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
  ![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)
</div>

## ✨ 项目介绍

Singula-Zero Login UI 是一个独立、可运行的 React 登录页交互示例。页面左侧的四个角色会根据鼠标位置、输入框焦点和密码显隐状态做出连续反馈，让常规登录流程更有生命力，同时保持界面简洁、清晰。

本仓库只包含登录页面的展示与交互代码，不包含真实账号、认证接口、数据库或任何业务系统源码。

## 🎭 交互亮点

- 👀 **视线跟随**：角色眼睛会自然跟随鼠标移动。
- ↔️ **身体倾斜**：四个角色会根据指针方向平滑倾斜，不会突然跳动。
- ⌨️ **输入反馈**：聚焦账号或密码输入框时，角色会做出对应反应。
- 🔐 **密码互动**：切换显示或隐藏密码时，角色身体、眼睛和表情会连续过渡。
- 🟣 **动态按钮**：登录按钮带有简洁的悬浮反馈。
- 📱 **响应式布局**：桌面端显示完整角色场景，小屏设备自动切换为紧凑登录布局。
- ♿ **减少动态效果**：遵循系统的 `prefers-reduced-motion` 设置。

## 🧰 技术栈

- React 18
- TypeScript 5
- Vite 6
- Lucide React
- CSS 动画与 `requestAnimationFrame`

## 🚀 本地运行

环境要求：Node.js 18 或更高版本。

```bash
git clone https://github.com/Singula-zero/Login-UI-page.git
cd Login-UI-page
npm install
npm run dev
```

启动后，根据终端提示在浏览器中打开本地地址。

## 📦 构建项目

```bash
npm run build
```

构建产物会生成在 `dist/` 目录中。

## 🗂️ 目录结构

```text
Login-UI-page/
├── src/
│   ├── AnimatedAuthCharacters.tsx  # 四个角色及跟随动画
│   ├── App.tsx                     # 登录页面结构与交互状态
│   ├── InteractiveAuthButton.tsx   # 登录按钮交互
│   ├── main.tsx                    # React 入口
│   └── styles.css                  # 登录页专用样式
├── index.html
├── package.json
└── vite.config.ts
```

## 📝 使用说明

- 当前表单不会发送账号或密码，点击登录不会请求任何后端服务。
- 如需接入真实系统，请在自己的后端完成认证，并避免在前端保存密钥或真实凭据。
- 角色动画集中在 `AnimatedAuthCharacters.tsx`，页面布局和表单状态位于 `App.tsx`。

## 💬 交流与联系

- QQ 群：`915090915`
- 微信号：`IchliebeYiyi`

欢迎交流登录页动效、前端交互和 Singula-Zero 相关想法。

---

<div align="center">
  Made with React, TypeScript and a little personality.
</div>
