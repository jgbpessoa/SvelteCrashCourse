<script lang="ts">
  import QuestionButton from "./components/QuestionButton.svelte";
  import QuestionOption from "./components/QuestionOption.svelte";
  import QuestionText from "./components/QuestionText.svelte";
  import { answers, type Answer } from "../../../store";
  import type { SvelteComponent_1 } from "svelte";
  import { goto } from "$app/navigation";

  export let data: any;

  let currentQuestionIndex = 0;
  let answersValue: Answer[];
  let selectedOption: null | string = null;
  let showCorrectAnswer = false;

  const handleChangeOption = (label: string) => {
    selectedOption = label;
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    showCorrectAnswer = true;

    answers.update((currentState) => {
      const updatedAnswerState = currentState;

      const object = {
        id: currentQuestionIndex + 1,
        isCorrect: selectedOption === question.answer,
      };
      updatedAnswerState.push(object);

      return updatedAnswerState;
    });
  };

  const handleNext = () => {
    showCorrectAnswer = false;
    selectedOption = null;

    if (currentQuestionIndex === data.questions.length - 1) {
      goto("/result");
      return;
    }

    currentQuestionIndex++;
  };

  answers.subscribe((value) => {
    answersValue = value;
  });

  $: question = data.questions[currentQuestionIndex];
</script>

<div class="w-full">
  <QuestionText text={question.question} />
  <div class="flex justify-between flex-wrap">
    {#each question.options as option (option.id)}
      <QuestionOption
        {option}
        {selectedOption}
        {handleChangeOption}
        {showCorrectAnswer}
        answer={question.answer}
      />
    {/each}
  </div>
  <QuestionButton {handleSubmit} {handleNext} {showCorrectAnswer} />
</div>
