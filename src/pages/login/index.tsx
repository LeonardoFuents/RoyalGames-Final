import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Autenticar } from "@/src/pages/api/authService";
import { erro, notificacao } from "@/src/utils/toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            erro("Preencha todos os campos.");
            return;
        }

        setCarregando(true);
        try {
            await Autenticar(email, senha);
            notificacao("Login realizado com sucesso!");
            router.push("/home");
        } catch (err: any) {
            erro(err.message || "Erro ao realizar login.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main className={styles.pagina_login}>
            <div className={styles.container_login}>

                <div className={styles.coluna_imagem}>
                    <img
                        src="../imgs/mulherlogin.png"
                        alt="Personagem cyberpunk com luz de neon"
                        className={styles.imagem_destaque}
                    />
                </div>

                <div className={styles.coluna_form}>
                    <div className={styles.caixa_login}>

                        <img
                            src="../imgs/logo.png"
                            alt="Logótipo Royal Games"
                            className={styles.logo_form}
                        />

                        <form className={styles.formulario} onSubmit={handleSubmit}>
                            <div className={styles.grupo_input}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={carregando}
                                />
                            </div>

                            <div className={styles.grupo_input}>
                                <label htmlFor="senha">Senha</label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    disabled={carregando}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.btn_entrar}
                                disabled={carregando}
                            >
                                {carregando ? "Entrando..." : "Entrar"}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </main>
    );
};

export default Login;