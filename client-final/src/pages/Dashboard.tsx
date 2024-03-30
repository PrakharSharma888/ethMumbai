import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import { Gem } from 'lucide-react';
import SportsAchivement from '../assets/templates/sports.png'
import NFT_IMG from '../assets/templates/MusicNFT.png'
import InGameItems from '../assets/templates/InGameItems.png'
import MedicalResearch from '../assets/templates/MedicalResearc.png'
import PennyCollection from '../assets/templates/PennyCollection.png'
import CardCollection from '../assets/templates/InGameItems.png'

const TemplateData = [
  {
    id: 1,
    name: "Sports Achivement",
    description: "Generate a ethereum custom token",
    url: 'create/sports',
    icon: SportsAchivement
  },
  {
    id: 2,
    name: "Music NFT",
    description: "Generate a ethereum custom NFT",
    url: 'create/nft',
    icon: NFT_IMG
  },
  {
    id: 3,
    name: "In-games Items",
    description: "Generate a ethereum custom NFT",
    url: 'create/staking',
    icon: InGameItems
  },
  {
    id: 4,
    name: "Medical Research",
    description: "Generate a ethereum custom NFT",
    url: 'create/farm',
    icon: MedicalResearch
  },
  {
    id: 5,
    name: "Penny Collection",
    description: "Generate a ethereum custom NFT",
    url: 'create/marketplace',
    icon: PennyCollection
  },
  {
    id: 6,
    name: "Card Collection",
    description: "Generate a ethereum custom NFT",
    url: 'create/launchpad',
    icon: CardCollection
  },
]
const Dashboard = () => {
  const { user, eoa } = useContext(UserContext)
  const navigate = useNavigate()
  const [showTemplate, setShowTemplate] = useState("new-template");
  const [templates, setTemplates] = useState([])

  const [createdTemplates, setCreatedTemplates] = useState([])

  const toggleTemplate = () => {
    if (showTemplate === "new-template") {
      setShowTemplate("already-created-template");
    } else {
      setShowTemplate("new-template");
    }
  };

  // TODO : Abhi sirf sports contracts ke liye h ye, baakio k liye bhi dynamic bnana h

  useEffect(() => {
    axios.post("http://localhost:8080/contract/getSportsContracts", {
      userID: user._id
    })
      .then((res) => {
        setCreatedTemplates(res.data.contracts)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  console.log('rdcs', createdTemplates)

  console.log(user)


  if (!eoa) {
    navigate('/')
  }

  return (
    <div className="h-screen w-screen text-white bg-black p-10 flex flex-col gap-10 mt-14">
      <div className="border-[1px] py-5 px-10 rounded-2xl border-gray-700 h-full flex gap-10 flex-col justify-between">
        {
          user && (
            <span> Hi {user.name}</span>
          )
        }
        <div className="inline-flex">
          {/* TODO: Functionality lgani h  */}
          <div className="p-1 border-gray-500 flex border-[1px] gap-2 rounded-md">
            <div
              className={
                showTemplate === "new-template"
                  ? "bg-white text-black px-2 rounded-sm cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={toggleTemplate}
            >
              New Templates
            </div>
            <div
              className={
                showTemplate === "already-created-template"
                  ? "bg-white text-black px-2 rounded-sm cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={toggleTemplate}
            >
              Already Created Templates
            </div>
          </div>
        </div>

        {showTemplate === "new-template" ? (
          <>
            <div className="flex justify-between items-center border-gray-700 border-[1px] rounded-2xl py-10 px-8">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">
                  {" "}
                  Ethereum AI Builder
                </span>
                <span className="text-sm">
                  {" "}
                  Generate you custom DEFI application for Ethereum
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <span> Slelct Target Chain </span>
                <select className="text-black min-w-40 p-2 rounded-md">
                  <option className="py-2">Ethereum </option>
                  <option className="py-2">Binance</option>
                  <option className="py-2">Polygon</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-gray-700 border-[1px] px-8 rounded-2xl py-10">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">
                  {" "}
                  Select Templates{" "}
                </span>
                <span className="teext-sm">
                  Choose modules to activate on your project, you can configure
                  them later
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 cursor-pointer w-full">
                {TemplateData.map((data) => {
                  return (
                    <Link to={data.url}
                      className="flex flex-col gap-3 justify-end items-center py-10 border-[0.5px] min-h-56 bg-black text-white border-gray-400 rounded-2xl w-full"
                      key={data.id}
                      style={{ backgroundImage: `url(${data.icon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >

                      <div className=''>
                        <div className='w-full flex justify-center items-center'>
                          {/* Remove the div with className='Gemh-20 w-20 flex justify-center items-center' */}
                        </div>
                        <div className="flex flex-col justify-center text-center">
                          <span className="text-xl font-semibold">
                            {data.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {data.description}
                          </span>
                        </div>
                      </div>
                    </Link>

                  );
                })}
              </div>
              <div>last row</div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-10">
            {createdTemplates.map((template) => {
              return (
                <div
                  key={template._id}
                  className="relative bg-cover bg-center flex flex-col justify-center items-center py-10 border-[0.5px] min-h-80 bg-white text-black border-gray-400 rounded-2xl"
                  style={{ backgroundImage: `url(https://www2.deloitte.com/content/dam/insights/articles/GLOB164584_Sports-NFT/primary/GLOB164584_Banner.png/jcr:content/renditions/cq5dam.web.1200.627.jpeg)` }}
                >
                  <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                  <div className="z-10 relative flex flex-col justify-center items-center text-center">
                    <span className="text-xl font-semibold text-white">
                      {template.TokenName}
                    </span>
                    {/* <span className="text-xs text-white">
                      {template.contractAddress}
                    </span> */}
                    <div className='text-black bg-white px-1 rounded-md'>{template.TokenSymbol}</div>
                    <Link
                      to={`/contract/${template._id}`}
                      className="bg-black w-full px-10 text-white text-center py-3 rounded-sm cursor-pointer"
                    >
                      Interact With this contract
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        )}


      </div>
      {/* <Audit /> */}
      {/* <CodeEditor /> */}
    </div>
  )
}

export default Dashboard