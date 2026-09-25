import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AnimatedAuthCharacters } from "./AnimatedAuthCharacters";
import { InteractiveAuthButton } from "./InteractiveAuthButton";

export function App() {
  const [account, setAccount] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="auth-page">
      <section className="auth-source-visual" aria-hidden="true">
        <div className="auth-source-brand">
          <img alt="" src="https://i.postimg.cc/nLrDYrHW/icon.png" />
          <span>Singula-Zero</span>
        </div>
        <div className="auth-source-stage">
          <AnimatedAuthCharacters
            isTyping={isTyping}
            passwordLength={password.length}
            showPassword={isPasswordVisible}
          />
        </div>
      </section>

      <section className="auth-panel" aria-label="登录">
        <div className="auth-form-shell">
          <div className="auth-source-mobile-brand" aria-hidden="true">
            <img alt="" src="https://i.postimg.cc/nLrDYrHW/icon.png" />
            <span>Singula-Zero</span>
          </div>

          <div className="auth-heading">
            <h1>欢迎回来</h1>
            <p>请输入你的登录信息</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              账号
              <input
                autoComplete="username"
                onBlur={() => setIsTyping(false)}
                onChange={(event) => setAccount(event.target.value)}
                onFocus={() => setIsTyping(true)}
                placeholder="请输入账号"
                type="text"
                value={account}
              />
            </label>

            <label>
              密码
              <span className="auth-password-field">
                <input
                  autoComplete="current-password"
                  onBlur={() => setIsTyping(false)}
                  onChange={(event) => setPassword(event.target.value)}
                  onFocus={() => setIsTyping(true)}
                  placeholder="请输入密码"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={isPasswordVisible ? "隐藏密码" : "显示密码"}
                  className="auth-password-toggle"
                  onClick={() => setIsPasswordVisible((current) => !current)}
                  type="button"
                >
                  {isPasswordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>

            <InteractiveAuthButton disabled={!account.trim() || !password} text="登录" type="submit" />
          </form>
        </div>
      </section>
    </main>
  );
}
