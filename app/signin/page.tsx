import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="signin">
      <div className="signin-card">
        <section className="signin-art">
          <img className="photo" src="/figma/signin-photo.png" alt="" />
          <img className="photo" src="/figma/signin-photo-overlay.png" alt="" />
          <img className="photo" src="/figma/signin-glow.svg" alt="" style={{ objectFit: "contain", top: "auto" }} />
          <div className="copy">
            <h2>Lorem Ipsum</h2>
            <h3>Lorem Ipsum is simply</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem I</p>
          </div>
        </section>
        <SignInForm />
      </div>
    </main>
  );
}
