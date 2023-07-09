import { error } from "@sveltejs/kit";
import quizzes from "../../../data.json";

export function load({ params }: { params: { id: string } }) {
  const quiz = quizzes.find((quiz) => quiz.id === +params.id);

  if (!quiz) {
    throw error(404, "Quiz not found");
  }

  return quiz;
}
