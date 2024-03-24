'use client';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AccountContext } from "../../context/context";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup: React.FC = () => {
    const router = useRouter();
    const account = useContext(AccountContext);
    const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (!account) {
            router.push("/");
        }
        if (account) {
            setWalletAddress(account);
        }
    }, [account, router]);


    const HandleSubmit = async () => {
        try {
            await axios.post('/api/signup', {
                name,
                email,
                walletAddress
            }).then((res) => {
                console.log(res)
            }
            )
            console.log('here')
            // Handle success response
        } catch (error) {
            console.error('Error signing up:', error.response?.data);
            // Handle error response
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input

                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="metamaskId"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Metamask ID
                        </label>
                        <input
                            value={walletAddress}
                            disabled={true}
                            type="text"
                            id="metamaskId"
                            name="metamaskId"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <button onClick={HandleSubmit} className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
