const BASE_URL = "http://localhost:3333"

export const getTraffic = async () => {
    try {
        const response = await fetch(`${BASE_URL}/findTrafficGbs/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao getTraffic:', error);
        throw error;
    }
};

export const getPacketLoss = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/packetLossAvgClientes/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao getPacketLoss:', error);
        throw error;
    }
}

export const getFindDisponibility = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/findDisponibility/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao findDisponibility:', error);
        throw error;
    }
}

export const getLatencyGt50 = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/latencyMoreThan50Clientes/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao getLatencygt50 :', error);
        throw error;
    }
}

export const findManyClientes = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/findManyCliente/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao findManyClientes:', error);
        throw error;
    }
}

export const latencyAvarageClientes = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/latencyAvarageClientes/`);
        if (response.status != 200)  {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na funcao latencyAvagereClientes:', error);
        throw error;
    }
}


