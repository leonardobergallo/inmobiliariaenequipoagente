import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import PropertyCard from '../components/PropertyCard'
import IT360Presentation from '../components/IT360Presentation'

const Home = () => {
  const navigate = useNavigate()

  const featuredProperties = [
    {
      id: 1,
      title: "Casa Moderna en Centro",
      location: "Av. Reforma 123, Ciudad de México",
      price: "$250,000 USD",
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYAUUzwn1_LUTQkn1x0yIobFAzBHJJT6qejhkiDcqPkb59dLqKLD020qDMPLogrUd6d8KdyQXn_aB11ecOaRYPY7SNgxawhRO_rSyF3CpwYbYOB1ViQ2nbEJdP0I9OOqRanWGsaGcA7OGnCqiXzA2_gUjP6vAj3Mk_S28lI-cVaTGWSdK6c-Q7mZcJX3gWjjj0QKVoF0GwD6vX_yM-c1yfp7EZOqHYfv1nicyfoNhkObCUxEiOJlT-mAK-4kBWj1pXQoyDaCTOJu4",
      featured: true
    },
    {
      id: 2,
      title: "Loft Exclusivo Polanco",
      location: "Calle Campos Elíseos, CDMX",
      price: "$180,000 USD",
      bedrooms: 1,
      bathrooms: 1,
      area: "85m²",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkc5ITNlvLnDxm7EGo0tJfnx-lnGK301DMSjU8GFNIayJpQEnJyRm4hTBya7vwgGwoagIOYQK1zuYtNMDMGEZPwzZKE4hzlchybodv2kpjbl2--mG_oayPCQWfQ2d4GYJ0XRMdsWS-qIRYYlggXYwOcDNuXtq-Lo8Xii-vN4i5p6kiQ0lTWpw_nGXr1TQlMWVwH2d-GfsV5ZOZ7fKrTN4b5Os7GpnDFMq819Fgejv9sfJJBljrJfOFNQ1nC1ljQZc1xjOf5MOguMU",
      featured: false
    }
  ]

  const recentProperties = [
    {
      id: 3,
      title: "Villa Sol y Mar",
      location: "Zona Hotelera, Cancún",
      price: "$450k",
      bedrooms: 4,
      bathrooms: 3,
      area: "200m²",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN2fiNJvdAVzbujGy1KbuouFnq0MLZHQ5L3UE_amlQfxF2tr77ZMPb48qygDRdI1ZqxOEXQbqXXFg1tvjg5QsJpTSe-PCBGOJ4mCIRXLsIi7ejc48qH64_VLsVjY57eLYtHZqb4ht3D13lh8sHUzNeg1IAFyNEq6d4MLIlbMcn_WTmWcmZbbqSQVbuCHWWvYYkDdvvrFfIWRENL2lrIv6-WuVrtmFDb4xLNLZXAjHkvaGEXVHaxhjaZ0z6l2PT517rnT1U7GTIieQ",
      new: true
    },
    {
      id: 4,
      title: "Residencia Familiar",
      location: "Lomas de Chapultepec",
      price: "$320k",
      bedrooms: 3,
      bathrooms: 2,
      area: "180m²",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATI49yHjfNKht0WTkFSdx00tKue9MnxyHLhi6x5WP04JLeuKUWSC0H6gG9tXrgbl-8qMSYvAPxlTitckwcH2YvXjBiQNgyQhXi3GqlXXO3Kwo3Xj_hiRcmtkh3rjLp4A9UI-3jEH39-nacU5ZNs3klXIBwgHIjNhloJAjCjGJCmVeAC0uEC8kf6buuzuYlKPpvIspIZEZaQGqI-alx7mibdfMcb0M8eotF0wTRVE6b5k44dTqfeA8Qyoex9Ls5ZHlJika4iV6kleY",
      new: true
    }
  ]

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-[480px] md:max-w-7xl mx-auto bg-white dark:bg-[#111a22] shadow-xl md:shadow-none">
      <Header />
      <IT360Presentation />
      <Navbar />
    </div>
  )
}

export default Home

