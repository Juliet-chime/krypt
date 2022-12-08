import React, { useState,useEffect } from "react";
import {ethers} from 'ethers'

import { contractABI ,contractAddress} from "../utils/constant";


export const TransactionContext = React.createContext()

const {ethereum} = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)

    const signer = provider.getSigner()

    const transactionContract =  new ethers.Contract(contractAddress,contractABI,signer)

    // console.log({provider,signer,transactionContract})

    return transactionContract;
}

export const TransactionProvider =({children}) => {

    const [connectedAccount,setConnectedAccount] = useState('')

    const [formData,setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''})

    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    const onHandleChange = (e,name) => {
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))
    }

    const checkIfWalletIsConnected = async () => {
try{
    if(!ethereum) return alert('Please install Metamask');

    const accounts = await ethereum.request({method:'eth_accounts'});
    
    if(accounts.length) {
        setConnectedAccount(accounts[0])
    }
    
    console.log(accounts)
}catch(err){
    console.log(err)

    throw new Error('No ethereum object') 
}
}

const connectWallets = async () => {
    try{
        if(!ethereum) return alert('Please install Metamask');

        const accounts = await ethereum.request({ method: "eth_requestAccounts", });

        setConnectedAccount(accounts[0])
    } catch(err){
        console.log(err)

        throw new Error('No ethereum object') 
    }
}

const sendTransaction = async () => {
    try{
        if(!ethereum) return alert('Please install Metamask');

        const {addressTo,amount,keyword,message} = formData

        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount)

        await ethereum.request({
            method:'eth_sendTransaction',
            params:[{
                from:connectedAccount,
                to:addressTo,
                gas:'0x5208', //2100 Gwei
                value:parsedAmount._hex,  //0.00001
            }]
        })

      const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);

      setIsLoading(true)

      console.log(`Loading - ${transactionHash.hash}`)
      await transactionHash.wait()

      setIsLoading(false)

      console.log(`success- ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount()

      setTransactionCount(transactionCount.toNumber())

    } catch(err){
        console.log(err)

         throw new Error('No ethereum object') 
    }
}

useEffect(()=>{
    checkIfWalletIsConnected() 
},[])

    return (<TransactionContext.Provider value={{connectWallets,connectedAccount,setConnectedAccount,formData,setFormData,onHandleChange,sendTransaction}}>
        {children}
    </TransactionContext.Provider>)
}