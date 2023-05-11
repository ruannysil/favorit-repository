import { useState, useCallback, FormEvent, ChangeEvent, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { toast } from 'react-toastify';

import api from '../../services/api'
import { Link } from 'react-router-dom';

interface Repository {
    name: string
}



export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<boolean>(false);

    //DidMount Buscar

    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if (repoStorage) {
            setRepositorios(JSON.parse(repoStorage))
        }
    }, [])

    //DidUpdate alterar ou salvar

    useEffect(() => {
        if (repositorios.length > 0) {
            localStorage.setItem('repos', JSON.stringify(repositorios))
        } else {
            localStorage.removeItem('repos');
        }
    }, [repositorios])

    const notifyError = (message: string) => {
        toast.error(message)
    }

    const notifySucesso = (message: string) => {
        toast.success(message)
    }

    const notifyWarn = (message: string) => {
        toast.warn(message);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        setLoading(true);
        setAlert(false);
        e.preventDefault();
        console.log(newRepo)

        try {

            if (newRepo === '') {
                throw new Error('Você precisa indicar um repositorio')
            }


            const reponse = await api.get(`repos/${newRepo}`);

            const hasRepo = repositorios.find(repo => repo.name === newRepo);

            if (hasRepo) {
                throw new Error('Repositorio Duplicado')
            }

            const newData: Repository = {
                name: reponse.data.full_name,
            };

            setRepositorios([...repositorios, newData])
            setNewRepo('');
            notifySucesso(`Repositorio adicionado com sucesso ${newData.name}`);
        } catch (error) {
            console.log(error)
            setAlert(true);
            notifyError('Você precisa indicar um repositorio');
        } finally {
            setLoading(false);
        }
    }


    function handleinputChange(e: ChangeEvent<HTMLInputElement>) {
        setNewRepo(e.target.value)
        setAlert(false)
    }

    const removeRepository = useCallback((repoName: string) => {
        setRepositorios(prevRepos => {
            const updatedRepos = prevRepos.filter(repo => repo.name !== repoName);
            notifySucesso(`Você removeu o repositorio: ${repoName}`)
            return updatedRepos;
        });
    }, []);


    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositores
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>

                <input
                    type="text"
                    placeholder="Adicionar Repositorios"
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading}>
                    {
                        loading ? (
                            <FaSpinner color='#fff' size={14} />
                        ) : (

                            <FaPlus color='#fff' size={14} />
                        )
                    }
                </SubmitButton>

            </Form>
            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => removeRepository(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}</span>
                        <Link to={`/repositorio/${repo.name}`}>
                            <FaBars size={20} />
                        </Link>
                        {repo.name === newRepo && (
                            <>
                                {notifyWarn(`Repositorio duplicado: ${encodeURIComponent(repo.name)}`)}
                            </>
                        )}
                    </li>
                ))}
            </List>
        </Container>
    )
}