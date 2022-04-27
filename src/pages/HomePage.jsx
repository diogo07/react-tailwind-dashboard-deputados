import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import consts from "../consts";

export default function HomePage() {

    const [deputados, setDeputados] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get(`${consts.API_URL}deputados?ordem=ASC&ordenarPor=nome&idLegislatura=56&itens=20`)
            .then((response) => {
                if (response.status === 200) {
                    setDeputados(response.data.dados);
                    setPages(response.data.links);
                }
            });
    }, []);


    const search = async (evt) => {
        
        if(evt?.target?.value){
            axios.get(`${consts.API_URL}deputados?ordem=ASC&ordenarPor=nome&&idLegislatura=56&itens=20&nome=${evt.target.value}`)
            .then((response) => {
                if (response.status === 200) {
                    setDeputados(response.data.dados);
                    setPages(response.data.links);
                }
            });
        }

        if (evt?.href.includes('https')){
            axios.get(evt.href)
            .then((response) => {
                if (response.status === 200) {
                    setDeputados(response.data.dados);
                    setPages(response.data.links);
                }
            });
        }
    }

    
    return (
        <div class="min-h-full">
            <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>

                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-4 flex items-center md:ml-6">
                            </div>
                        </div>
                        <div class="-mr-2 flex md:hidden">

                        </div>
                    </div>
                </div>

                <div class="md:hidden" id="mobile-menu">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                    </div>

                </div>
            </nav>

            <header class="bg-white ">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">Candidatos</h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="xl:w-1/2 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                        <label for="FirstName" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Candidato</label>
                        <input tabindex="0" onChange={search} type="text" id="FirstName" name="firstName" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="Digite o nome do candidato" />
                    </div>
                    <div class="px-4 py-6 sm:px-0">
                        <ul className="divide-y divide-gray-200">
                            {deputados.map((deputado) => (
                                <li key={deputado.id} className="py-4 flex">
                                    <img className="h-20 w-20 rounded-full" src={deputado.urlFoto} alt="" />
                                    <div className="ml-3">
                                        <a href={`/deputados/${deputado.id}`} className="text-sm font-medium text-gray-900">{deputado.nome}</a>
                                        <p className="text-sm text-gray-500">{deputado.email}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <Pagination previous={() => search(pages.find((page) => page.rel === 'previous'))} next={() => search(pages.find((page) => page.rel === 'next'))}/>
                </div>
            </main>
        </div>
    );
}