import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  Layout,
  notificationProvider,
} from "@refinedev/chakra-ui";

import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { IconHeart, IconHome, IconNews, IconRss } from "@tabler/icons";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { Header } from "./components/header";
import { authProvider } from "./authProvider";
import { dataProvider } from "./rest-data-provider";
import DashboardPage from "pages/dashboard";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const baseTheme = extendTheme(
    withDefaultColorScheme({ colorScheme: "telegram" }),
  );
  const theme = extendTheme({
    ...baseTheme,
    colors: {
      sider: {
        background: "#2A4365",
      },
    },
  });

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ChakraProvider theme={theme}>
          <Refine
            dataProvider={dataProvider("/api/v1")}
            notificationProvider={notificationProvider()}
            resources={[
              {
                name: "dashboard",
                icon: <IconHome />,
                list: "/",
                meta: { label: "Dashboard" },
              },
              {
                name: "feeds",
                icon: <IconRss />,
                list: "/feeds",
                create: "/feeds/create",
                edit: "/feeds/edit/:id",
                show: "/feeds/show/:id",
                canDelete: true,
              },
              {
                name: "entries",
                icon: <IconNews />,
                list: "/entries",
                create: "/entries/create",
                edit: "/entries/edit/:id",
                show: "/entries/show/:id",
                canDelete: true,
              },
              {
                name: "favorites",
                icon: <IconHeart />,
                list: "/favorites",
                // create: "//create",
                // edit: "//edit/:id",
                show: "/favorites/show/:id",
                canDelete: true,
              },
            ]}
            routerProvider={routerBindings}
            // authProvider={authProvider}
            i18nProvider={i18nProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <Layout Header={Header}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  path="/"
                  element={<DashboardPage />}
                />
                <Route path="/feeds">
                  <Route index element={<ChakraUIInferencer />} />
                  <Route path="create" element={<ChakraUIInferencer />} />
                  <Route path="edit/:id" element={<ChakraUIInferencer />} />
                  <Route path="show/:id" element={<ChakraUIInferencer />} />
                </Route>
                <Route path="/entries">
                  <Route index element={<ChakraUIInferencer />} />
                  <Route path="create" element={<ChakraUIInferencer />} />
                  <Route path="edit/:id" element={<ChakraUIInferencer />} />
                  <Route path="show/:id" element={<ChakraUIInferencer />} />
                </Route>
                <Route path="/favorites">
                  <Route index element={<ChakraUIInferencer />} />
                  <Route path="show/:id" element={<ChakraUIInferencer />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        defaultValues: {
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <Layout Header={Header}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
