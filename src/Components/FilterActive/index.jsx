import './styles.css'
import { useEffect, useState } from 'react'
import api from '../../Api'

export default function FilterActive({ token, setTransactions }) {

    const headers = { Authorization: `Bearer ${token}` }
    const [btnStyle] = useState('btn-category')
    const [categoryFilter, setCategoryFilter] = useState([])
    const [clearing, setClearing] = useState(false)

    useEffect(() => {
        setClearing(false)
    }, [clearing])

    function category(e) {
        let localCategoryFilter = categoryFilter

        if (e.target.className === 'btn-category select') {
            e.target.className = 'btn-category'
        } else {
            e.target.className = 'btn-category select'
        }

        if (localCategoryFilter.length < 1) {
            localCategoryFilter.push(e.target.value)
            return setCategoryFilter(localCategoryFilter)
        }

        const searchCategory = localCategoryFilter.includes(e.target.value)

        if (searchCategory) {
            localCategoryFilter = localCategoryFilter.filter(item => {
                return item !== e.target.value
            })
            return setCategoryFilter(localCategoryFilter)
        }

        localCategoryFilter.push(e.target.value)
        setCategoryFilter(localCategoryFilter)
    }

    async function clearFilter() {
        try {
            const respost = await api.get('/transacao', {
                headers
            });
            setTransactions([...respost.data]);
            setCategoryFilter([])
            setClearing(true)
        } catch (error) {
            return
        }
    }

    async function filtering() {
        try {
            let queryFilter = ''
            const filtro = 'filtro[]='
            const searchParams = new URLSearchParams()
            for (let i = 0; i < categoryFilter.length; i++) {
                searchParams.append(filtro, categoryFilter[i])
            }
            queryFilter = `/transacao?${searchParams.toString()}`
            const respost = await api.get(queryFilter, {
                headers
            });
            return setTransactions([...respost.data]);
        } catch (error) {
            return
        }
    }

    return (
        <div className='container-filter'>
            <span className='title'>Categoria</span>
            <div className='categories'>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Alimentação'
                >
                    Alimentação
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Assinaturas e Serviços'
                >
                    Assinaturas e Serviços
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Casa'
                >
                    Casa
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Mercado'
                >
                    Mercado
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Cuidados Pessoais'
                >
                    Cuidados Pessoais
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Educação'
                >
                    Educação
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Família'
                >
                    Família
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Lazer'
                >
                    Lazer
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Pets'
                >
                    Pets
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Presentes'
                >
                    Presentes
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Roupas'
                >
                    Roupas
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Saúde'
                >
                    Saúde
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Transporte'
                >
                    Transporte
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Salário'
                >
                    Salário
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Vendas'
                >
                    Vendas
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Outras receitas'
                >
                    Outras receitas
                </button>
                <button
                    className={!clearing ? 'default' : btnStyle}
                    onClick={category}
                    value='Outras despesas'
                >
                    Outras despesas
                </button>
            </div>
            <div className='apply-filter'>
                <button
                    className='clear'
                    onClick={clearFilter}
                >
                    Limpar Filtros
                </button>
                <button
                    className='apply'
                    onClick={filtering}
                >
                    Aplicar Filtros
                </button>
            </div>
        </div >
    )
}