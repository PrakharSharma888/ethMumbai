import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import { Gem } from 'lucide-react';

const TemplateData = [
  {
    id: 1,
    name: "Token",
    description: "Generate a ethereum custom token",
    url: 'create/token',
    icon: <Gem size={60} strokeWidth={1} />
  },
  {
    id: 2,
    name: "NFT",
    description: "Generate a ethereum custom NFT",
    url: 'create/nft',
    icon: <Gem size={60} strokeWidth={1} />
  },
  {
    id: 3,
    name: "Staking",
    description: "Generate a ethereum custom NFT",
    url: 'create/staking',
    icon: <Gem size={60} strokeWidth={1} />
  },
  {
    id: 4,
    name: "Farm",
    description: "Generate a ethereum custom NFT",
    url: 'create/farm',
    icon: <Gem size={60} strokeWidth={1} />
  },
  {
    id: 5,
    name: "Marketplace",
    description: "Generate a ethereum custom NFT",
    url: 'create/marketplace',
    icon: <Gem size={60} strokeWidth={1} />
  },
  {
    id: 6,
    name: "Launchpad",
    description: "Generate a ethereum custom NFT",
    url: 'create/launchpad',
    icon: <Gem size={60} strokeWidth={1} />
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

  useEffect(() => {
    axios.post("http://localhost:8080/contract/getContracts", {
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
    <div className="h-full w-screen text-white bg-black p-10 flex flex-col gap-10 mt-14">
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
            <div className="flex  justify-between items-center border-gray-700 border-[1px] rounded-2xl py-10 px-8">
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
              <div className="grid grid-cols-3 gap-4 cursor-pointer">
                {TemplateData.map((data) => {
                  return (
                    <div
                      className="flex flex-col gap-3 justify-centerc items-center py-10 border-[0.5px] bg-black text-white border-gray-400 rounded-2xl min-w-36 min-h-32"
                      key={data.id}
                    >
                      <Link to={data.url}>
                        <div className='w-full flex justify-center items-center'>
                          <div className='Gemh-20 w-20 flex justify-center items-center'> {data.icon} </div>
                        </div>
                        <div className="flex flex-col justify-center text-center">
                          <span className="text-xl font-semibold">
                            {data.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {data.description}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div>last row</div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-10 ">
            {
              createdTemplates.map((template) => {
                return (
                  <div className="flex flex-col gap-3 justify-centerc items-center py-10 border-[0.5px] bg-white text-black border-gray-400 rounded-2xl">
                    <div className='flex justify-center'>
                      <img src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg' alt='err' className='' />
                    </div>
                    <div className="flex flex-col justify-center text-center">
                      <span className="text-xl font-semibold">
                        {template.artistName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {template.contractAddress}
                      </span>
                      <div>
                        {
                          template.trackName
                        }
                      </div>
                    </div>

                    <Link to={`/contract/${template._id}`} className="bg-black w-full px-10 text-white text-center py-3 rounded-sm cursor-pointer"> Interact With this contract </Link>
                  </div>
                )
              })
            }
          </div>
        )}


      </div>
      {/* <Audit /> */}
      {/* <CodeEditor /> */}
    </div>
  )
}

export default Dashboard