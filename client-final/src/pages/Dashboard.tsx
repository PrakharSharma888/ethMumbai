import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const TemplateData = [
  {
    id: 1,
    name: "Token",
    description: "Generate a ethereum custom token",
  },
  {
    id: 2,
    name: "NFT",
    description: "Generate a ethereum custom NFT",
  },
  {
    id: 3,
    name: "Staking",
    description: "Generate a ethereum custom NFT",
  },
  {
    id: 4,
    name: "Farm",
    description: "Generate a ethereum custom NFT",
  },
  {
    id: 5,
    name: "Marketplace",
    description: "Generate a ethereum custom NFT",
  },
  {
    id: 6,
    name: "Launchpad",
    description: "Generate a ethereum custom NFT",
  },
]
const Dashboard = () => {
  const [showTemplate, setShowTemplate] = useState("new-template");
  const [templates, setTemplates] = useState([])

  const toggleTemplate = () => {
    if (showTemplate === "new-template") {
      setShowTemplate("already-created-template");
    } else {
      setShowTemplate("new-template");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/template/getAll")
      .then((res) => {
        console.log(res.data)
        setTemplates(res.data.allTemplates)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(templates)

  return (
    <div className="h-full w-screen text-black p-10 flex flex-col gap-10">
      <div className="border-[1px] py-5 px-10 rounded-2xl border-gray-700 h-full flex gap-10 flex-col justify-between">
        <div className="inline-flex">
          {/* TODO: Functionality lgani h  */}
          <div className="p-1 border-gray-500 flex border-[1px] gap-2 rounded-md">
            <div
              className={
                showTemplate === "new-template"
                  ? "bg-black text-white px-2 rounded-sm cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={toggleTemplate}
            >
              New Templates
            </div>
            <div
              className={
                showTemplate === "already-created-template"
                  ? "bg-black text-white px-2 rounded-sm cursor-pointer"
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
                      className="flex flex-col gap-3 justify-centerc items-center py-10 border-[0.5px] bg-white text-black border-gray-400 rounded-2xl min-w-36 min-h-32"
                      key={data.id}
                    >
                      <div>
                        <div className='bg-red-100 h-20 w-20'> Icon </div>
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
                  );
                })}
              </div>
              <div>last row</div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-10 ">
            {
              templates.map((template) => {
                return (
                  <div className="flex flex-col gap-3 justify-centerc items-center py-10 border-[0.5px] bg-white text-black border-gray-400 rounded-2xl">
                    <div className='flex justify-center'>
                      <img src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg' alt='err' className=''/>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                      <span className="text-xl font-semibold">
                        {template.templateName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {template.templateDescription}
                      </span>
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