/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';


interface Repository {
    name: string,
    description: string,
    owner: {
        avatar_url: string,
        login: string,
        name: string,
    },
    issues: Issue[];
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    labels: Label[];
    user: {
        avatar_url: string;
        login: string,
        id: string,
    }
}

interface Label {
    id: number;
    name: string;
}


export default function Repositorio() {
    const [repositorio, setRepositorio] = useState<Repository>({} as Repository)
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [page, setPage] = useState(1);
    const filters = [
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false },
    ];

    const [filterIndex, setFilterIndex] = useState(0);

    const { owner, repo } = useParams();

    useEffect(() => {
        async function load() {
            const nomeRepo = `${owner}/${repo}`


            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    }
                })
            ]);
            console.log(repositorioData.data)
            console.log(issuesData.data)
            setRepositorio(repositorioData.data);
            setIssues(issuesData.data)
            setLoading(false);
        }

        load();


    }, [owner, repo]);

    useEffect(() => {

        async function loadIssue() {
            const nomeRepo = `${owner}/${repo}`
            const reponse = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    per_page: 5,
                    page: page,
                }
            });

            setIssues(reponse.data)
        }
        loadIssue();
    }, [filterIndex, filters, owner, page, repo])

    function handlePage(action: string) {
        setLoadingPage(true);

        if (action === 'back') {
            const promise = new Promise<void>((resolve) => {
                setTimeout(() => {
                    setPage(page - 1);
                    resolve();
                }, 2000);
            });

            toast.promise(promise, {
                pending: 'Carregando...',
                success: 'Carregamento concluído!',
                error: 'Ocorreu um erro ao carregar.',
            }).then(() => {
                setLoadingPage(false);
            });
        } else if (action === 'next') {
            const promise = new Promise<void>((resolve) => {
                setTimeout(() => {
                    setPage(page + 1);
                    resolve();
                }, 3000);
            });

            toast.promise(promise, {
                pending: 'Carregando...',
                success: 'Carregamento concluído!',
                error: 'Ocorreu um erro ao carregar.',
            }).then(() => {
                setLoadingPage(false);
            });
        }
    }

    function handleFilter(index: number) {
        setFilterIndex(index);
        console.log(filterIndex)

    }

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }


    return (
        <Container>

            <BackButton to={'/'}>
                <FaArrowLeft color={'#000'} size={20} />
            </BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterList active={filterIndex} >
                {filters.map((filter, index) => (
                    <button
                        type='button'
                        key={filter.label}
                        onClick={() => handleFilter(index)}>
                        {filter.label}
                    </button>
                ))}
            </FilterList>

            <IssuesList>
                {issues.map((issue) => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.length > 0 ? (
                                    issue.labels.map((label) => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))
                                ) : (
                                    <span style={{ display: 'flex' }}>
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <FaRocket color='#fff' size={18} />
                                        ))}
                                    </span>
                                )}
                                <p>{issue.user.login}</p>
                            </strong>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                {page !== 1 ? (
                    <button
                        type='button'
                        onClick={() => handlePage('back')}
                        disabled={loadingPage}
                    >
                        <MdOutlineNavigateBefore size={20} />
                        voltar
                    </button>
                ) : null}
                <button
                    type='button'
                    onClick={() => handlePage('next')}
                    disabled={loadingPage}
                >
                    proxima
                    <MdOutlineNavigateNext size={20} />
                </button>
            </PageActions>

        </Container>
    )
}