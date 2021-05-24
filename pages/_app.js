import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";
import { EcommerceProvider } from "@/components/miscs/ContextEcommerceProvider";
import '@/core/suneditor.css'
import 'react-notifications-component/dist/theme.css'
import { parseCookies } from "nookies";
import Axios from "axios";

class MyApp extends App {
  state = {
    menu: {},
    config: {},
    general: {},
    completelyLoaded: false,
    name: 'Таван Богд Групп | Tavan Bogd Group',
    description: 'Description...',
    promoTriggered: false
  };
  async componentDidMount() {
    const res = await checkLanguage(queryString, null);
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config, menu: res.data.menuHeader, general: res.data.menuFooter });

    // GOOGLE TAG MANAGER
    // TagManager.initialize({ gtmId: "GTM-WG8JRZ7" });

    if (!this.state.promoTriggered) {
      setTimeout(() => {
        this.setState({ promoTriggered: true });
      }, 3000);
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider value={this.state}>
          <EcommerceProvider initialAuth={this.props.initialAuth}>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </EcommerceProvider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

const queryString = `
{
  menuHeader{
    Desktop {
      Title Path
      Sub {
        Title
        Child {
          Title Path
        }
        Image {
          url formats
        }
      }
    }
    DesktopTop{
      Title Path
      Icon{
        url
      }
    }
    Promotion
    Promo{
      Image{ url formats}
      Link
    }
  }
  menuFooter {
    Footer {
      Title
      Child{Title Path}
    }
    Social{
      Title
      Instagram Facebook Twitter Pinterest Linkedin
    }
    FooterBottom{
      Title Path
    }
    Networks {
      Icon {url}
      Name Path
    }
  }
}
`;

MyApp.getInitialProps = async ({ ctx }) => {

  const { jwt } = parseCookies(ctx)

  if (jwt) {
    try {
      let res = await Axios(process.env.serverUrl + '/users/me', { headers: { 'Authorization': 'Bearer ' + jwt } });
      return { initialAuth: res.data };
    }
    catch (e) { return {} }
  }
  return {};
}