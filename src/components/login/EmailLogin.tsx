"use client";
import { Form, Input } from "antd";

export interface LoginFormData {
  email: string;
  password: string;
}
interface EmailLoginProps {
  onSubmit: (values: LoginFormData) => void;
}
export default function EmailLogin({ onSubmit }: EmailLoginProps) {
  return (
    <Form onFinish={onSubmit}>
      <Form.Item name="email">
        <Input placeholder="Email" type="email" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="Password" />
      </Form.Item>
    </Form>
  );
}
