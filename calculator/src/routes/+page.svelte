<script lang="ts">
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const operations = ["/", "x", "-", "+", "="];

  let selectedOperation = "";
  let display = "";
  let firstNumber = "";
  let secondNumber = "";

  const handleOperationClick = (operation: string) => {
    if (!firstNumber) return;

    if (operation === "=") {
      if (!secondNumber) return;
      const firstNum = +firstNumber;
      const secondNum = +secondNumber;

      let results: string | number = "";

      switch (selectedOperation) {
        case "/":
          results = firstNum / secondNum;
          break;
        case "x":
          results = firstNum * secondNum;
          break;
        case "+":
          results = firstNum + secondNum;
          break;
        case "-":
          results = firstNum - secondNum;
          break;
      }

      const showDecimals = !Number.isInteger(results);

      if (showDecimals) {
        results = (+results).toFixed(3);
      }

      display = results.toString();
      firstNumber = display;
      secondNumber = "";
    }

    selectedOperation = operation;
  };

  const handleClear = () => {
    firstNumber = "";
    secondNumber = "";
    selectedOperation = "";
    display = "";
  };

  const handleNumberClick = (number: string) => {
    if (display === "0" && number === "0") return;
    if (display.includes(".") && number === ".") return;
    if (!selectedOperation) {
      if (display === "" && number === ".") {
        firstNumber = "0.";
        return (display = firstNumber);
      }

      firstNumber = `${firstNumber}${number}`;
      return (display = firstNumber);
    }

    if (display === "" && number === ".") {
      secondNumber = "0.";
      return (display = secondNumber);
    }

    secondNumber = `${secondNumber}${number}`;
    display = secondNumber;
  };
</script>

<main>
  <div class="calculator">
    <div class="results">
      {display}
    </div>
    <div class="digits">
      <div class="numbers">
        <button class="btn btn-xlg" on:click={handleClear}> C </button>
        {#each numbers as number (number)}
          <button
            class={`btn ${number === "0" ? "btn-lg" : null}`}
            on:click={() => handleNumberClick(number)}
          >
            {number}
          </button>
        {/each}
      </div>
      <div class="operations">
        {#each operations as operation (operation)}
          <button
            class={`btn btn-${
              operation === selectedOperation ? "silver" : "orange"
            }`}
            on:click={() => handleOperationClick(operation)}
          >
            {operation}
          </button>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .calculator {
    background-color: rgb(28, 28, 28);
    width: 240px;
    padding: 15px;
    border-radius: 7px;
  }

  .digits {
    display: flex;
  }

  .operations {
    display: flex;
    flex-direction: column;
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
  }

  .btn {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: rgb(114, 113, 113);
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin: 5px;
    border: none;
  }

  .btn-lg {
    width: 110px;
  }

  .btn-orange {
    background-color: orange;
  }

  .btn-silver {
    background-color: silver;
  }

  .btn-xlg {
    width: 170px;
  }

  .results {
    height: 60px;
    color: white;
    font-size: 50px;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 10px;
  }
</style>
