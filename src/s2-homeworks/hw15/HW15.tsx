import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import {Loader} from "../hw10/Loader";

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    //страница с которой начинается
    const [page, setPage] = useState(1)
    //количество строк на странице
    const [count, setCount] = useState(4)
    //наличие крутилки
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    //useSearchParams хук для извлечения значения параметров из строки запроса
    //хук возвращает две сущности объект URLSearchParams и метод обновления
    const [searchParams, setSearchParams ] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])
// console.log()
// console.log(searchParams)
    //делаем запрос на сервер и сохраняем данные
    const sendQuery = (params: any) => {
        //включаем крутилку
        //console.log(params)
        setLoading(true)
        getTechs(params)
            .then((res:any) => {
                // делает студент
                // сохранить пришедшие данные
                setTechs(res.data.techs)
                //console.log(res)
                setTotalCount(res.data.totalCount)
                //выключаем крутилку
                setLoading(false)
            })
    }

    //принимает первым аргументом номер страницы вторым аргументом новое количество записей
    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент

        // setPage(
        setPage(newPage)
        // setCount(
        setCount(newCount)
        // sendQuery(
        sendQuery({page: newPage, count: newCount})
        // setSearchParams(
        setSearchParams({ page: String(newPage), count: String(newCount)})
        //setSearchParams({ page: String(newPage), count: newCount})
    }

    const onChangeSort = (newSort: string) => {
        // делает студент
console.log(newSort)
        // setSort(
        setSort(newSort)
        // setPage(1) // при сортировке сбрасывать на 1 страницу
        setPage(1)
        // sendQuery(
        sendQuery({ sort: newSort})
        //        sendQuery({ sort: newSort, page: String(1), count: String(count)})
        // setSearchParams(
        setSearchParams({ sort: newSort})
        //        setSearchParams({ sort: newSort, page: String(1), count: String(count)})
    }

    useEffect(() => {
        //преобразуем массив/Map состоящий из двух элементов в объект с ключом и значением
        const params = Object.fromEntries(searchParams)
        //console.log(params)
        //делаем запрос на сервер
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])
    //сработает при первом вмонтировании

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'} className={s.container}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {/*{idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}*/}
                {idLoading && <Loader/>}
                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
