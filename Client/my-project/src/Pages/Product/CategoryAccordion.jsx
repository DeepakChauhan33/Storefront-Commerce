import { Disclosure } from "@headlessui/react";


// React Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const categories = [
    "All Products",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
];



const CategoryAccordion = ({ selected, setSelected }) => {



    return (
        <Disclosure defaultOpen>
            {({ open }) => (
                <>

                    <Disclosure.Button className="font-bold text-lg flex items-center justify-between w-full px-4 py-2 text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none ">
                        Category {open ? <IoIosArrowDown className="inline" /> : <IoIosArrowUp className="inline" />}

                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-2 mt-3 px-4 py-2 bg-gray-50 rounded-lg">
                        {categories.map((option) => (
                            <label key={option} className="flex text-sm md:text-md items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selected === option}
                                    onChange={() => setSelected(option)}

                                />
                                {option}
                            </label>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default CategoryAccordion;