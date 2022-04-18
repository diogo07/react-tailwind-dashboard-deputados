import axios from "axios";
import React, { useState, useEffect } from "react";
import AutoComplete from "../AutoComplete";


export default function HomePage() {

    const [deputados, setDeputados] = useState([]);

    useEffect(() => {
        axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome')
            .then((response) => {
                if (response.status === 200) {
                    setDeputados(response.data.dados);
                }
            });
    }, []);



    const deputadosFilter = (list) => {
        return list.map((dep) => {
            return {
                id: dep.id,
                name: dep.nome        
            }
        });
    }

    return (
        <div class="min-h-full">
            <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>

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
                    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="px-4 py-6 sm:px-0">
                       
                        <AutoComplete items={deputadosFilter(deputados)}/> 
                       
                    </div>
                </div>
            </main>
        </div>
    );
}