import { Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { AuthProvider, useAuth } from "@/hooks/AuthContext";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const _layout = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user: ", session?.user?.id);

      if (session) {
        //set auth
        //move to home
        setAuth(session?.user);
        router.replace("/(main)/Home");
      } else {
        //means user log out
        //set auth null
        //move to welcome
        setAuth(null);
        router.push("/screens/Welcome");
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
