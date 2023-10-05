"use client";

import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({
    mobile: "",
    ccode: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    setError("");
    fetch("https://admin.ticketsmaster.com.ng/user_api/u_login_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.Result === "true") {
          alert(res.ResponseMsg);
          router.push("/");
        } else {
          setError(res.ResponseMsg);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-col items-center justify-center max-w-[50ch]">
          <h1 className={`mb-6 text-3xl font-bold`}>Login</h1>
          <div className="flex flex-row">
            <select
              className="mb-4 mr-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
              onChange={({ target: { value } }) =>
                setData({ ...data, ccode: value })
              }
              value={data.ccode}
            >
              <option>+234</option>
            </select>
            <input
              className="mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
              type="number"
              placeholder="Phone Number"
              onInput={({ target: { value } }) =>
                setData({ ...data, mobile: value })
              }
              value={data.mobile}
            />
          </div>
          <input
            className="w-full mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
            type="password"
            placeholder="Password"
            onInput={({ target: { value } }) =>
              setData({ ...data, password: value })
            }
          />
          <p className="p-2 mb-4 text-red-500 text-sm">{error}</p>
          <button
            disabled={loading}
            className="pb-4 pt-4 pl-8 pr-8 bg-gray-300 rounded outline-none"
            onClick={onSubmit}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}
