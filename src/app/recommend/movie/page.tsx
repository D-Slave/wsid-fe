"use client";
import MovieInfo from "@/components/movie/MovieInfo";
import { Col, Row, Space } from "antd";
import MovieActor from "@/components/movie/MovieActor";
import SimilarMovie from "@/components/movie/SimilarMovie";

export default function MovieMainPage() {
  return (
    <Row justify="space-between">
      <Col span={6}>
        <MovieInfo />
      </Col>
      <Col span={8}>
        <MovieActor />
      </Col>
      <Col span={8}>
        <SimilarMovie />
      </Col>
    </Row>
  );
}
