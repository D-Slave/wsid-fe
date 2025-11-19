"use client";

import React from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Space,
  Typography,
  Tag,
  Checkbox,
} from "antd";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: string;
  hashTag: string[];
  agreement: boolean;
  age: number;
};

export default function SignupPage() {
  const [form] = Form.useForm();

  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const tagsData = [
    "#가성비",
    "#야간감성",
    "#좌석여유",
    "#데이트",
    "#혼밥",
    "#친구모임",
  ];

  const handleTag = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    form.setFieldValue("hashTag", nextSelectedTags);
  };

  const handleGender = (gender: string) => {
    setSelectedGender(gender);
    form.setFieldValue("gender", gender);
  };

  // 이메일 검증
  const validateEmail = (_: unknown, value: string) => {
    if (!value) return Promise.reject(new Error("이메일을 입력해주세요"));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error("올바른 이메일 형식이 아닙니다"));
    }
    return Promise.resolve();
  };

  // 비밀번호 검증
  const validatePassword = (_: unknown, value: string) => {
    if (!value) return Promise.reject(new Error("비밀번호를 입력해주세요"));
    if (value.length < 8) {
      return Promise.reject(new Error("비밀번호는 8자 이상이어야 합니다"));
    }
    return Promise.resolve();
  };

  // 비밀번호 확인 검증
  const validateConfirmPassword = (_: unknown, value: string) => {
    if (!value)
      return Promise.reject(new Error("비밀번호를 다시 입력해주세요"));
    if (value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("비밀번호가 일치하지 않습니다"));
    }
    return Promise.resolve();
  };

  // 이름 검증
  const validateName = (_: unknown, value: string) => {
    if (!value) return Promise.reject(new Error("이름을 입력해주세요"));
    if (value.length < 2) {
      return Promise.reject(new Error("이름은 2자 이상이어야 합니다"));
    }
    return Promise.resolve();
  };

  // 성별 검증
  const validateGender = (_: unknown, value: string) => {
    if (!value) return Promise.reject(new Error("성별을 선택해주세요"));
    return Promise.resolve();
  };

  // 해시태그 검증
  const validateHashTag = (_: unknown, value: string[]) => {
    if (!value || value.length === 0) {
      return Promise.reject(
        new Error("관심 해시태그를 최소 1개 이상 선택해주세요")
      );
    }
    if (value.length > 5) {
      return Promise.reject(
        new Error("해시태그는 최대 5개까지 선택할 수 있습니다")
      );
    }
    return Promise.resolve();
  };

  // 개인정보 동의 검증
  const validateAgreement = (_: unknown, value: boolean) => {
    if (!value)
      return Promise.reject(new Error("개인정보 수집 및 이용에 동의해주세요"));
    return Promise.resolve();
  };

  // 폼 제출
  const handleSubmit = async (values: FormData) => {
    try {
      console.log("회원가입 데이터:", values);
       //TODO: API 호출
       const response = await fetch('http://localhost:8080/api/v1/user/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(values)
       });
       
      const data = await response.json();

      if (data.userId === -1) {
        alert(data.message);
        return;
      }

      alert("회원가입이 완료되었습니다!");
      window.location.href = "http://localhost:3000/login"; // ✅ 절대주소 이동
      
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Row
      style={{
        width: "100%",
        minHeight: "calc(100vh - 120px)",
        padding: 16,
      }}
      justify="center"
      align="middle"
    >
      <Card style={{ width: 400, border: "none" }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Typography.Title level={2} style={{ marginBottom: 8 }}>
              회원가입
            </Typography.Title>
            <Typography.Text type="secondary">
              오늘 뭐하지?에 오신 것을 환영합니다
            </Typography.Text>
          </div>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="이름"
              rules={[{ validator: validateName }]}
            >
              <Input placeholder="이름을 입력해주세요" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="이메일"
              rules={[{ validator: validateEmail }]}
            >
              <Input placeholder="이메일을 입력해주세요" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="비밀번호"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                placeholder="비밀번호를 입력해주세요"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="비밀번호 확인"
              rules={[{ validator: validateConfirmPassword }]}
            >
              <Input.Password
                placeholder="비밀번호를 다시 입력해주세요"
                size="large"
              />
            </Form.Item>
            <Form.Item name="age" label="나이">
              <Input size="large" type="number" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="성별"
              rules={[{ validator: validateGender }]}
            >
              <Space direction="horizontal" size={16}>
                <Button
                  onClick={() => handleGender("male")}
                  type={selectedGender === "male" ? "primary" : "default"}
                >
                  남성
                </Button>
                <Button
                  onClick={() => handleGender("female")}
                  type={selectedGender === "female" ? "primary" : "default"}
                >
                  여성
                </Button>
              </Space>
            </Form.Item>

            <Form.Item
              name="hashTag"
              label="관심 해시태그 선택"
              rules={[{ validator: validateHashTag }]}
            >
              <Space wrap>
                {tagsData.map((tag) => (
                  <Tag.CheckableTag
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={(checked) => {
                      handleTag(tag, checked);
                    }}
                  >
                    {tag}
                  </Tag.CheckableTag>
                ))}
              </Space>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ validator: validateAgreement }]}
            >
              <Checkbox>개인정보 수집 및 이용에 동의합니다.</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: "100%", height: 44 }}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph style={{ textAlign: "center" }}>
            <Link href="/login">이미 계정이 있으신가요? 로그인</Link>
          </Typography.Paragraph>
        </Space>
      </Card>
    </Row>
  );
}
