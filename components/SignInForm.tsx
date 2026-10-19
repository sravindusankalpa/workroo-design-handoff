"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <form className="signin-form" onSubmit={onSubmit}>
      <div>
        <p className="welcome">Hi, Welcome back! 👋</p>
        <h1 className="signin-title">Sign in</h1>
      </div>
      <div className="fields">
        <div className="field">
          <label htmlFor="workshopId">Workshop ID</label>
          <input id="workshopId" name="workshopId" placeholder="Your workshop ID" />
        </div>
        <div className="field">
          <label htmlFor="username">User Name</label>
          <input id="username" name="username" placeholder="Your user name" />
        </div>
        <div className="field">
          <div className="field-row">
            <label htmlFor="password">Password</label>
            <a className="forgot" href="#forgot">
              Forgot password ?
            </a>
          </div>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
            />
            <button type="button" aria-label="Toggle password" onClick={() => setShowPassword((v) => !v)}>
              <img src="/figma/icon-hide.svg" alt="" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      <button className="btn-signin" type="submit">
        Sign in
      </button>
      <div className="powered">
        <span>Powered by</span>
        <img src="/figma/logo-infine.png" alt="infine" />
        <span>© 2026</span>
      </div>
    </form>
  );
}
