import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { setRegistered } from '../utils/registerStorage';

export default function RegisterPopup({ open, onClose, onRegistered }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [debugApiBaseUrl, setDebugApiBaseUrl] = useState('');

  const canSubmit = useMemo(() => {
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedEmail || !trimmedPhone) return false;
    return true;
  }, [email, phone]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setError('');
    setSubmitting(true);

    const baseUrl = (import.meta?.env?.VITE_API_BASE_URL || 'https://happyfeet-backend-i54g.onrender.com').replace(
      /\/+$/,
      ''
    );
    setDebugApiBaseUrl(baseUrl);
    const payload = { email: email.trim(), phone: phone.trim() };

    try {
      const res = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError(data?.error || 'Registration failed. Please try again.');
        return;
      }

      setRegistered();
      onRegistered?.(payload);
    } catch {
      setError('Network error. Please try again.');
      // eslint-disable-next-line no-console
      console.error('Register API network error', { baseUrl });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
          aria-modal="true"
          role="dialog"
        >
          <Modal
            initial={{ opacity: 0, scale: 0.92, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 520, damping: 34 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <StyledWrapper>
              <div className="card">
                <button className="close_btn" type="button" aria-label="Close" onClick={() => onClose?.()}>
                  ×
                </button>
                <input
                  defaultValue
                  className="blind-check"
                  type="checkbox"
                  id="blind-input"
                  name="blindcheck"
                  hidden
                />
                <label htmlFor="blind-input" className="blind_input">
                  <span className="hide">Hide</span>
                  <span className="show">Show</span>
                </label>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="title">Register</div>
                  {error ? (
                    <div className="error">
                      {error}
                      {debugApiBaseUrl ? <div className="error_sub">API: {debugApiBaseUrl}</div> : null}
                    </div>
                  ) : null}
                  <label className="label_input" htmlFor="email-input">
                    Email
                  </label>
                  <input
                    spellCheck="false"
                    className="input"
                    type="email"
                    name="email"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <div className="frg_pss">
                    <label className="label_input" htmlFor="phone-input">
                      Phone
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Why phone?
                    </a>
                  </div>
                  <input
                    spellCheck="false"
                    className="input"
                    type="tel"
                    name="phone"
                    id="phone-input"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                  <button className="submit" type="submit" disabled={!canSubmit || submitting}>
                    Submit
                  </button>
                </form>
                <label htmlFor="blind-input" className="avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 64 64" id="penguin">
                    <defs>
                      <linearGradient id="penguinBody" x1="16" y1="12" x2="48" y2="56" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#1f2b33" />
                        <stop offset="0.55" stopColor="#162027" />
                        <stop offset="1" stopColor="#0c1318" />
                      </linearGradient>
                      <linearGradient id="penguinWing" x1="10" y1="26" x2="28" y2="44" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#24333c" />
                        <stop offset="1" stopColor="#0c1318" />
                      </linearGradient>
                      <linearGradient id="penguinWingR" x1="54" y1="26" x2="36" y2="44" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#24333c" />
                        <stop offset="1" stopColor="#0c1318" />
                      </linearGradient>
                      <radialGradient id="penguinBelly" cx="50%" cy="30%" r="70%">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#eef1f5" />
                      </radialGradient>
                      <linearGradient id="beak" x1="32" y1="29" x2="32" y2="41" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#ffb21f" />
                        <stop offset="1" stopColor="#f08d0e" />
                      </linearGradient>
                      <linearGradient id="feet" x1="32" y1="52" x2="32" y2="60" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#ffb21f" />
                        <stop offset="1" stopColor="#f08d0e" />
                      </linearGradient>
                    </defs>

                    <ellipse cx="32" cy="55.5" rx="20" ry="6.2" fill="#7bbbd7" opacity="0.85" />

                    <path
                      d="M14 36c-3.5 4.4-4.8 9.6-4.2 14.1 0.3 2.7 2.3 4.6 4.9 4.8 3.5 0.2 7.7-2.5 10.8-6.9"
                      fill="url(#penguinWing)"
                    />
                    <path
                      d="M50 36c3.5 4.4 4.8 9.6 4.2 14.1-0.3 2.7-2.3 4.6-4.9 4.8-3.5 0.2-7.7-2.5-10.8-6.9"
                      fill="url(#penguinWingR)"
                    />

                    <ellipse cx="32" cy="33.5" rx="22" ry="25" fill="url(#penguinBody)" />
                    <ellipse cx="32" cy="36" rx="15.2" ry="19.6" fill="url(#penguinBelly)" />

                    <path
                      d="M22 22c1.2-6.8 18.8-6.8 20 0"
                      fill="none"
                      stroke="#223039"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.6"
                    />

                    <ellipse cx="32" cy="31" rx="18" ry="14.5" fill="#ffffff" />

                    <g className="penguin-eyes">
                      <ellipse cx="25" cy="28" rx="5.6" ry="6.2" className="penguin-eye-white-l" fill="#ffffff" />
                      <ellipse cx="39" cy="28" rx="5.6" ry="6.2" className="penguin-eye-white-r" fill="#ffffff" />
                      <ellipse cx="26.6" cy="29" rx="2.7" ry="3.4" className="penguin-eye-l" fill="#121a20" />
                      <ellipse cx="37.4" cy="29" rx="2.7" ry="3.4" className="penguin-eye-r" fill="#121a20" />
                      <circle cx="25.8" cy="27.8" r="1" className="penguin-eye-glint-l" fill="#ffffff" />
                      <circle cx="38.4" cy="27.8" r="1" className="penguin-eye-glint-r" fill="#ffffff" />
                      <path
                        d="M20.8 28.6c1.8 2.2 3.6 3.2 5.2 3.2s3.4-1 5.2-3.2"
                        className="penguin-lid-l"
                        fill="none"
                        stroke="#121a20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0"
                      />
                      <path
                        d="M34.8 28.6c1.8 2.2 3.6 3.2 5.2 3.2s3.4-1 5.2-3.2"
                        className="penguin-lid-r"
                        fill="none"
                        stroke="#121a20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0"
                      />
                    </g>

                    <path
                      d="M32 32c4.6 0 8 3.1 8 3.1S36.8 43.8 32 43.8 24 35.1 24 35.1s3.4-3.1 8-3.1Z"
                      fill="url(#beak)"
                    />
                    <path
                      d="M32 34.4c3.2 0 5.8 1.8 5.8 1.8S35.6 41.2 32 41.2s-5.8-5-5.8-5S28.8 34.4 32 34.4Z"
                      fill="#d97f10"
                      opacity="0.55"
                    />

                    <ellipse cx="22.2" cy="34.8" rx="4.4" ry="3" fill="#e8b7b2" opacity="0.55" />
                    <ellipse cx="41.8" cy="34.8" rx="4.4" ry="3" fill="#e8b7b2" opacity="0.55" />

                    <path
                      d="M22.5 51.5c1.5 0 3.3 0.6 5 1.7c1.1 0.7 1.7 1.6 1.4 2.6c-0.4 1.3-2 2.4-4.2 2.8c-3.2 0.6-6.2-0.7-7.2-2.6c-0.6-1.2-0.2-2.4 1-3.2c1.1-0.8 2.5-1.3 4-1.3Z"
                      fill="url(#feet)"
                    />
                    <path
                      d="M41.5 51.5c1.5 0 2.9 0.5 4 1.3c1.2 0.8 1.6 2 1 3.2c-1 1.9-4 3.2-7.2 2.6c-2.2-0.4-3.8-1.5-4.2-2.8c-0.3-1 0.3-1.9 1.4-2.6c1.7-1.1 3.5-1.7 5-1.7Z"
                      fill="url(#feet)"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 64 64" id="penguin-flippers">
                    <path
                      d="M12 34c-3 3.4-4.6 7.6-4.6 12.2c0 4.2 3.6 6.8 7.4 5.3c4.8-1.9 9.6-8 12-13.1c1.6-3.3-2.3-6.4-6.6-5.6c-3 0.6-5.8 1.7-8.2 3.2Z"
                      fill="#0c1318"
                    />
                    <path
                      d="M52 34c3 3.4 4.6 7.6 4.6 12.2c0 4.2-3.6 6.8-7.4 5.3c-4.8-1.9-9.6-8-12-13.1c-1.6-3.3 2.3-6.4 6.6-5.6c3 0.6 5.8 1.7 8.2 3.2Z"
                      fill="#0c1318"
                    />
                    <path
                      d="M13.6 35.2c-2.2 2.6-3.4 5.9-3.4 9.4c0 3 2.5 4.9 5.2 3.8c3.3-1.3 6.9-5.8 8.6-9.3c1.1-2.2-1.7-4.2-4.8-3.7c-2.1 0.4-3.9 1.1-5.6 1.9Z"
                      fill="#24333c"
                      opacity="0.55"
                    />
                    <path
                      d="M50.4 35.2c2.2 2.6 3.4 5.9 3.4 9.4c0 3-2.5 4.9-5.2 3.8c-3.3-1.3-6.9-5.8-8.6-9.3c-1.1-2.2 1.7-4.2 4.8-3.7c2.1 0.4 3.9 1.1 5.6 1.9Z"
                      fill="#24333c"
                      opacity="0.55"
                    />
                  </svg>
                </label>
              </div>
            </StyledWrapper>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(3px);
`;

const Modal = styled(motion.div)`
  width: min(380px, 100%);
  will-change: transform, opacity;
`;

const StyledWrapper = styled.div`
  .card {
    --p: 22px;
    --h-form: auto;
    --w-form: 340px;
    --input-px: 0.75rem;
    --input-py: 0.65rem;
    --submit-h: 38px;
    --blind-w: 64px;
    --space-y: 0.5rem;
    width: var(--w-form);
    height: var(--h-form);
    max-width: 100%;
    border-radius: 16px;
    background: white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    overflow-y: auto;
    padding: var(--p);
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -webkit-user-select: none;
    user-select: none;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .close_btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    border: 1px solid rgba(22, 22, 22, 0.2);
    background: rgba(255, 255, 255, 0.9);
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    line-height: 1;
    z-index: 10;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .close_btn:hover {
    background: #ffffff;
    transform: scale(1.06);
  }

  .avatar {
    --sz-avatar: 166px;
    order: 0;
    width: var(--sz-avatar);
    min-width: var(--sz-avatar);
    max-width: var(--sz-avatar);
    height: var(--sz-avatar);
    min-height: var(--sz-avatar);
    max-height: var(--sz-avatar);
    border: 1px solid #707070;
    border-radius: 9999px;
    background: #a9d7f4;
    overflow: hidden;
    cursor: pointer;
    z-index: 2;
    perspective: 80px;
    position: relative;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    --sz-svg: calc(var(--sz-avatar) - 10px);
  }
  .avatar svg {
    position: absolute;
    transition:
      transform 0.2s ease-in,
      opacity 0.1s;
    transform-origin: 50% 100%;
    height: var(--sz-svg);
    width: var(--sz-svg);
    pointer-events: none;
  }
  .avatar svg#penguin {
    z-index: 1;
  }
  .avatar svg#penguin-flippers {
    z-index: 10;
    transform: translateY(calc(var(--sz-avatar) / 1.25));
  }

  .avatar::before {
    content: "";
    border-radius: 45%;
    width: calc(var(--sz-svg) / 3.889);
    height: calc(var(--sz-svg) / 5.833);
    border: 0;
    border-bottom: calc(var(--sz-svg) * (4 / 100)) solid #3c302a;
    bottom: 20%;

    position: absolute;
    transition: all 0.2s ease;
    z-index: 3;
    display: none;
  }
  .blind-check:checked ~ .avatar::before {
    width: calc(var(--sz-svg) * (9 / 100));
    height: 0;
    border-radius: 50%;
    border-bottom: calc(var(--sz-svg) * (10 / 100)) solid #3c302a;
    display: none;
  }
  .avatar svg#penguin .penguin-eye-r,
  .avatar svg#penguin .penguin-eye-l {
    animation: blink 10s 1s infinite;
    transition: all 0.2s ease;
  }
  @keyframes blink {
    0%,
    2%,
    4%,
    26%,
    28%,
    71%,
    73%,
    100% {
      ry: 3.4;
      cy: 29;
    }
    1%,
    3%,
    27%,
    72% {
      ry: 0.5;
      cy: 28.6;
    }
  }
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-r,
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-l {
    opacity: 0;
  }
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-white-l,
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-white-r,
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-glint-l,
  .blind-check:checked ~ .avatar svg#penguin .penguin-eye-glint-r {
    opacity: 0;
  }
  .blind-check:checked ~ .avatar svg#penguin .penguin-lid-l,
  .blind-check:checked ~ .avatar svg#penguin .penguin-lid-r {
    opacity: 1;
  }
  .blind-check:checked ~ .avatar svg#penguin-flippers {
    transform: translate3d(0, -10px, 0);
  }
  .avatar svg#penguin,
  .avatar::before,
  .avatar svg#penguin .penguin-eyes,
  .avatar svg#penguin .penguin-eye-r,
  .avatar svg#penguin .penguin-eye-l {
    transition: all 0.2s ease;
  }
  .blind-check:checked ~ .form:focus-within ~ .avatar svg#penguin,
  .blind-check:checked ~ .form:focus-within ~ .avatar::before,
  .blind-check:checked ~ .form:focus-within ~ .avatar svg#penguin .penguin-eyes,
  .blind-check:checked ~ .form:focus-within ~ .avatar svg#penguin .penguin-eye-r,
  .blind-check:checked ~ .form:focus-within ~ .avatar svg#penguin .penguin-eye-l {
    animation: none;
  }
  .form:focus-within ~ .avatar svg#penguin {
    animation: slick 3s ease infinite 1s;
    --center: rotateY(0deg);
    --left: rotateY(-4deg);
    --right: rotateY(4deg);
  }
  .form:focus-within ~ .avatar::before,
  .form:focus-within ~ .avatar svg#penguin .penguin-eyes,
  .blind-check:not(:checked)
    ~ .form:focus-within
    ~ .avatar
    svg#penguin
    .penguin-eye-r,
  .blind-check:not(:checked)
    ~ .form:focus-within
    ~ .avatar
    svg#penguin
    .penguin-eye-l {
    ry: 2.1;
    cy: 31.2;
    animation: slick 3s ease infinite 1s;
    --center: translateX(0);
    --left: translateX(-0.5px);
    --right: translateX(0.5px);
  }
  @keyframes slick {
    0%,
    100% {
      transform: var(--center);
    }
    25% {
      transform: var(--left);
    }
    75% {
      transform: var(--right);
    }
  }

  .card label.blind_input {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    z-index: 4;
    position: absolute;
    border: none;
    right: calc(var(--p) + (var(--input-px) / 2));
    bottom: calc(
      var(--p) + var(--submit-h) + var(--space-y) + (var(--input-py) / 1) + 3px
    );
    padding: 4px 0;
    width: var(--blind-w);
    border-radius: 4px;
    background-color: #fff;
    color: #4d4d4d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .card label.blind_input:before {
    content: "";
    position: absolute;
    left: calc((var(--input-px) / 2) * -1);
    top: 0;
    height: 100%;
    width: 1px;
    background: #8f8f8f;
  }
  .card label.blind_input:hover {
    color: #262626;
    background-color: #f2f2f2;
  }
  .blind-check ~ label.blind_input span.show,
  .blind-check:checked ~ label.blind_input span.hide {
    display: none;
  }
  .blind-check ~ label.blind_input span.hide,
  .blind-check:checked ~ label.blind_input span.show {
    display: block;
  }

  .form {
    order: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    width: 100%;
  }

  .form .title {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-top: 0;
    padding-bottom: 1rem;
    color: rgba(0, 0, 0, 0.7);
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  .form .error {
    width: 100%;
    margin-top: -0.25rem;
    margin-bottom: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 0, 0, 0.08);
    border: 1px solid rgba(255, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.75);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .form .error_sub {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0.8;
    word-break: break-word;
  }

  .form .label_input {
    white-space: nowrap;
    font-size: 1rem;
    margin-top: calc(var(--space-y) / 2);
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
    display: inline;
    text-align: left;
    margin-right: auto;
    position: relative;
    z-index: 99;
    -webkit-user-select: none;
    user-select: none;
  }

  .form .input {
    resize: vertical;
    background: white;
    border: 1px solid #8f8f8f;
    border-radius: 6px;
    outline: none;
    padding: var(--input-py) var(--input-px);
    font-size: 18px;
    width: 100%;
    color: #000000b3;
    margin: var(--space-y) 0;
    transition: all 0.25s ease;
  }
  .form .input#phone-input {
    padding-right: calc(var(--blind-w) + var(--input-px) + 4px);
  }
  .form .input:focus {
    border: 1px solid #0969da;
    outline: 0;
    box-shadow: 0 0 0 2px #0969da;
  }
  .form .frg_pss {
    width: 100%;
    display: inline-flex;
    align-items: center;
  }
  .form .frg_pss a {
    background-color: transparent;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.25s ease;
    color: #000000b3;
    font-weight: 500;
    float: right;
  }
  .form .frg_pss a:hover {
    color: #000;
  }

  .form .submit {
    height: var(--submit-h);
    width: 100%;
    outline: none;
    cursor: pointer;
    background-color: #fff;
    background-image: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(17, 17, 17, 0.04) 100%
    );
    border: 1px solid rgba(22, 22, 22, 0.2);
    font-weight: 500;
    letter-spacing: 0.25px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    -webkit-appearance: button;
    appearance: button;
    margin: var(--space-y) 0 0;
  }
  .form .submit:hover {
    background-image: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(17, 17, 17, 0.08) 100%
    );
    border: 1px solid rgba(22, 22, 22, 0.2);
    color: #111;
  }
  .form .submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .blind-check:checked ~ .form .input[type='tel'] {
    -webkit-text-security: disc;
  }
`;
