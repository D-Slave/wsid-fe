"use client";

import { Input } from "antd";
import { useState } from "react";

export interface LoginFormData {
  email: string;
  password: string;
}

interface EmailLoginProps {
  onChange: (values: LoginFormData) => void;
}

export default function EmailLogin({ onChange }: EmailLoginProps) {
  const [values, setValues] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (key: keyof LoginFormData, value: string) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div style={{ width: "100%" }}>
      <Input
        placeholder="Email"
        type="email"
        style={{ marginBottom: 12 }}
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <Input.Password
        placeholder="Password"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
    </div>
  );
}
