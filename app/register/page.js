"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    ccode: "+234",
    password: "",
    confirmPassword: "",
    refercode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    setError("");
    fetch("https://admin.ticketsmaster.com.ng/user_api/u_reg_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.Result === "true") {
          alert(res.ResponseMsg);
          router.push("/login");
        } else {
          setError(res.ResponseMsg);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className={`mb-6 text-3xl font-bold`}>Register</h1>
          <input
            className="w-full mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
            type="text"
            placeholder="Name"
            onInput={({ target: { value } }) =>
              setData({ ...data, name: value })
            }
            value={data.name}
          />
          <input
            className="w-full mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
            type="email"
            placeholder="Email Address"
            onInput={({ target: { value } }) =>
              setData({ ...data, email: value })
            }
            value={data.email}
          />
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
            value={data.password}
          />
          <input
            className="w-full mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
            type="password"
            placeholder="Confirm Password"
            onInput={({ target: { value } }) =>
              setData({ ...data, confirmPassword: value })
            }
            value={data.confirmPassword}
          />
          <input
            className="w-full mb-4 border-b border-gray-300 pb-4 pt-4 pl-8 pr-8 rounded outline-none"
            type="text"
            placeholder="Referal Code"
            onInput={({ target: { value } }) =>
              setData({ ...data, refercode: value })
            }
            value={data.refercode}
          />
          <p className="p-2 mb-4 text-red-500 text-sm">{error}</p>
          <button
            disabled={loading}
            className="pb-4 pt-4 pl-8 pr-8 bg-gray-300 rounded outline-none"
            onClick={onSubmit}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
}
