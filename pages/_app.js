import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";
import { EcommerceProvider } from "@/components/miscs/ContextEcommerceProvider";
import { parseCookies } from "nookies";
import Axios from "axios";

class MyApp extends App {
  state = {
    config: {},
    general: {},
    completelyLoaded: false,
    name: 'Таван Богд Групп | Tavan Bogd Group',
    description: 'Хамтын хүч, амжилтын түлхүүр'
  };
  async componentDidMount() {
    if(location.pathname === "/"){
      location.href = "http://tavanbogd.com/p/landingpage"
    }
    const res = await checkLanguage('/settings', null);
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config, general: res.data });

    // GOOGLE TAG MANAGER
    TagManager.initialize({ gtmId: "GTM-NZHP7XV" });

    // if (!this.state.promoTriggered) {
    //   setTimeout(() => {
    //     this.setState({ promoTriggered: true });
    //   }, 3000);
    // }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider value={this.state}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;