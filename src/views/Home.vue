<template>
  <div class="wrapper">
    <UserHamburgerMenu :show="showHamburgerMenu"
                       :src="require('@/assets/hamburger_icon_dark.png')"
                       @toggle-show="showHamburgerMenu=$event"/>
    <Header></Header>

    <div class="home">
      <div class="buttons-container" v-if="choice===null">
        <button @click="choice='join'">{{strings.homeView.joinGameButton}}</button>
        <button @click="choice='create'">{{strings.homeView.createGameButton}}</button>
      </div>


      <form @submit.prevent="play" v-if="choice!==null">
        <span @click="choice=null">&#8617;</span>
        <input :placeholder="strings.homeView.joinGameInputPlaceholder" v-model="input" required>
        <button>{{ strings.homeView.play }}</button>
      </form>


    </div>


    <div class="popup-background" v-if="showPopup" @click="showPopup=false">
      <div>
        <p>{{popupMessage}}</p>
        <div>
          <button @click="confirm">{{ confirmButton }}</button>
          <button @click="showPopup=false">{{ strings.homeView.cancelButton }}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {strings} from "../constants/constants";
import UserHamburgerMenu from "../components/UserHamburgerMenu";
import Header from "@/components/Header";


export default {
  name: 'Game',
  components: {Header, UserHamburgerMenu},
  data() {
    return {

      strings: strings,
      showHamburgerMenu: false,
      showPopup: false,
      popupMessage: "",
      input: "",
      choice: null,
      confirmButton: ""
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/global";
.wrapper{
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: auto;

  .home {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;

    .buttons-container{
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: start;
      height: 60%;
      width: 100%;
      @media (max-width: 700px) {
        flex-flow: column;

        align-items: center;
      }

      button{
        margin: 10px;
      }
    }

    form {
      position: relative;
      display: flex;
      flex-flow: column;
      justify-content: space-evenly;
      align-items: center;
      margin-top: -10%;
      background-color: $theme-color;
      @media (max-width: 700px) {
        margin-top: 30%;

      }
      height: 50%;
      width: 50%;
      @media (max-width: 750px){
        width: 80%;
      }

      span{
        position: absolute;
        font-size: 300%;
        top: 10%;
        left: 10%;
        color: $main-color;
        transition: all 0.5s;
        cursor: pointer;

        &:hover{
          transform: scale(1.3);
        }
      }

      input{
        background: none;
        outline: none;
        border: none;
        border-bottom: 2px solid $main-color;
        font-size: 250%;
        text-align: center;
        color: $main-color;
        width: 50%;
        @media (max-width: 750px){
          width: 80%;
        }
      }
    }



  }

  .popup-background{

    div{
      display: flex;
      flex-flow: column;
      color: $main-color;
      font-size: 150%;
      width: 100%;

      div{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-flow: row;
        justify-content: center;
        align-items: center;

        button{
          font-size: 100%;
        }
      }
    }
  }
}
</style>
