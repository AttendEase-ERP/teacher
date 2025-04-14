"use client";

import * as React from "react";

import { createClient } from "@/utils/supabase/client";

import { Session, User } from "@supabase/supabase-js";

const SessionContext = React.createContext<{
  user: User | null;
  session: Session | null;
} | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching authenticated user:", error);
      } else {
        setUser(data.user);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event == "SIGNED_IN" || event == "TOKEN_REFRESHED") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    fetchUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ user, session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return React.useContext(SessionContext);
};
