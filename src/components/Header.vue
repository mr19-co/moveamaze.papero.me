<template>
  <div class="header-wrapper">
    <div class="title"><img src="@/assets/title.png"></div>
    <div class="grid-container">
      <div class="spacer"></div>
      <div class="container one">
        <img src="@/assets/letters/M.png">
      </div>

      <div class="container two">
        <img src="@/assets/letters/O.png">
      </div>

      <div class="container three">
        <img src="@/assets/letters/V.png">
      </div>

      <div class="container four">
        <img src="@/assets/letters/E.png">
      </div>

      <div class="container five">
        <img src="@/assets/letters/A.png">
      </div>

      <div class="container six">
        <img src="@/assets/letters/M.png">
      </div>

      <div class="container seven">
        <img src="@/assets/letters/A.png">
      </div>

      <div class="container eight">
        <img src="@/assets/letters/Z.png">
      </div>

      <div class="container nine">
        <img src="@/assets/letters/E.png">
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped lang="scss">
.header-wrapper{
  --dim: min(7vw, 100px);
  --mdim: calc(var(--dim) * -1);
  position: relative;

  .title{
    display: none;
    @media (max-width: 700px) {
      padding-top: 20px;
      display: flex;
      width: 70%;
      margin: auto;
      img{
        width: 100%;
      }
    }
  }
  @keyframes scale-grid {
    to{transform: scale(1.2)}
  }
  .grid-container{
    width: fit-content;
    max-width: 1000px;
    margin: auto;
    transform-origin: top center;
    animation: scale-grid 1s 16s forwards;
    //margin-left: calc(var(--dim) / 2);
    display: grid;
    @media (max-width: 700px) {
      display: none;
    }
    grid-template-columns: repeat(9, var(--dim));
    grid-template-rows: var(--dim) var(--dim) var(--dim);
    .container{
      width: var(--dim);
      img{
        width: 100%;
      }
    }

    .one{
      grid-row: 2;
      grid-column: 2;
      animation: 20s one linear forwards;

      @keyframes one {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, 0)}
        30%  {transform: translate(0, 0)}
        35%  {transform: translate(0, 0)}
        40%  {transform: translate(0, 0)}
        45%  {transform: translate(0, 0)}
        50%  {transform: translate(0, 0)}
        55%  {transform: translate(0, 0)}
        60%  {transform: translate(0, var(--dim))}
        65%  {transform: translate(var(--mdim), var(--dim))}
        70%  {transform: translate(var(--mdim), 0)}
        75%  {transform: translate(var(--mdim), 0)}
        80%  {transform: translate(var(--mdim), 0)}
        85%  {transform: translate(var(--mdim), var(--mdim))}
        90%  {transform: translate(var(--mdim), var(--mdim))}
        95%  {transform: translate(var(--mdim), var(--mdim))}
        100% {transform: translate(var(--mdim), var(--mdim))}
      }
    }

    .two{
      grid-row: 2;
      grid-column: 3;
      animation: 20s two linear forwards;

      @keyframes two {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, 0)}
        30%  {transform: translate(0, 0)}
        35%  {transform: translate(0, 0)}
        40%  {transform: translate(0, 0)}
        45%  {transform: translate(0, 0)}
        50%  {transform: translate(0, var(--mdim))}
        55%  {transform: translate(var(--mdim), var(--mdim))}
        60%  {transform: translate(var(--mdim), 0)}
        65%  {transform: translate(var(--mdim), 0)}
        70%  {transform: translate(var(--mdim), 0)}
        75%  {transform: translate(var(--mdim), 0)}
        80%  {transform: translate(var(--mdim), 0)}
        85%  {transform: translate(var(--mdim), var(--mdim))}
        90%  {transform: translate(var(--mdim), var(--mdim))}
        95%  {transform: translate(var(--mdim), var(--mdim))}
        100% {transform: translate(var(--mdim), var(--mdim))}
      }
    }

    .three{
      grid-row: 2;
      grid-column: 4;

      animation: 20s three linear forwards;

      @keyframes three {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, 0)}
        30%  {transform: translate(0, 0)}
        35%  {transform: translate(0, 0)}
        40%  {transform: translate(0, var(--dim))}
        45%  {transform: translate(var(--mdim), var(--dim))}
        50%  {transform: translate(var(--mdim), 0)}
        55%  {transform: translate(var(--mdim), 0)}
        60%  {transform: translate(var(--mdim), 0)}
        65%  {transform: translate(var(--mdim), 0)}
        70%  {transform: translate(var(--mdim), 0)}
        75%  {transform: translate(var(--mdim), 0)}
        80%  {transform: translate(var(--mdim), 0)}
        85%  {transform: translate(var(--mdim), var(--mdim))}
        90%  {transform: translate(var(--mdim), var(--mdim))}
        95%  {transform: translate(var(--mdim), var(--mdim))}
        100% {transform: translate(var(--mdim), var(--mdim))}
      }
    }

    .four{
      grid-row: 2;
      grid-column: 5;
      animation: 20s four linear forwards;

      @keyframes four {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, 0)}
        30%  {transform: translate(0, var(--mdim))}
        35%  {transform: translate(var(--mdim), var(--mdim))}
        40%  {transform: translate(var(--mdim), 0)}
        45%  {transform: translate(var(--mdim), 0)}
        50%  {transform: translate(var(--mdim), 0)}
        55%  {transform: translate(var(--mdim), 0)}
        60%  {transform: translate(var(--mdim), 0)}
        65%  {transform: translate(var(--mdim), 0)}
        70%  {transform: translate(var(--mdim), 0)}
        75%  {transform: translate(var(--mdim), 0)}
        80%  {transform: translate(var(--mdim), 0)}
        85%  {transform: translate(var(--mdim), var(--mdim))}
        90%  {transform: translate(var(--mdim), var(--mdim))}
        95%  {transform: translate(var(--mdim), var(--mdim))}
        100% {transform: translate(var(--mdim), var(--mdim))}
      }
    }

    .five{
      grid-row: 3;
      grid-column: 5;
      animation: 20s five linear forwards;

      @keyframes five {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, 0)}
        30%  {transform: translate(0, var(--mdim))}
        35%  {transform: translate(0, var(--mdim))}
        40%  {transform: translate(0, var(--mdim))}
        45%  {transform: translate(0, var(--mdim))}
        50%  {transform: translate(0, var(--mdim))}
        55%  {transform: translate(0, var(--mdim))}
        60%  {transform: translate(0, var(--mdim))}
        65%  {transform: translate(0, var(--mdim))}
        70%  {transform: translate(0, var(--mdim))}
        75%  {transform: translate(0, var(--mdim))}
        80%  {transform: translate(0, var(--mdim))}
        85%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        90%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        95%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        100% {transform: translate(0,  calc( 2 * var(--mdim)))}
      }

    }

    .six{
      grid-row: 3;
      grid-column: 6;
      animation: 20s nine linear forwards;
    }

    .seven{
      grid-row: 3;
      grid-column: 7;
      animation: 20s nine linear forwards;
    }

    .eight{
      grid-row: 3;
      grid-column: 8;
      animation: 20s nine linear forwards;
    }

    .nine{
      grid-row: 3;
      grid-column: 9;
      animation: 20s nine linear forwards;

      @keyframes nine {
        0%   {transform: translate(0, 0)}
        5%   {transform: translate(0, 0)}
        10%  {transform: translate(0, 0)}
        15%  {transform: translate(0, 0)}
        20%  {transform: translate(0, 0)}
        25%  {transform: translate(0, var(--mdim))}
        30%  {transform: translate(0, var(--mdim))}
        35%  {transform: translate(0, var(--mdim))}
        40%  {transform: translate(0, var(--mdim))}
        45%  {transform: translate(0, var(--mdim))}
        50%  {transform: translate(0, var(--mdim))}
        55%  {transform: translate(0, var(--mdim))}
        60%  {transform: translate(0, var(--mdim))}
        65%  {transform: translate(0, var(--mdim))}
        70%  {transform: translate(0, var(--mdim))}
        75%  {transform: translate(0, var(--mdim))}
        80%  {transform: translate(0, var(--mdim))}
        85%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        90%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        95%  {transform: translate(0,  calc( 2 * var(--mdim)))}
        100% {transform: translate(0,  calc( 2 * var(--mdim)))}
      }
    }

    .spacer{
      width: 1fr;
      aspect-ratio:1;
      grid-row: 1;
      grid-column: 1;
    }
  }


}


</style>