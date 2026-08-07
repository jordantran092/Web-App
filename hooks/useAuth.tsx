import { useState } from "react";
import { Keycloak } from "keycloak-js";npm 

export default function useAuth() {
    const [isLogin, setIsLogin] = useState(false);

    const client = new Keycloak();
}