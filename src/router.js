// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Address from './components/Address.vue'
import Hash from './components/Hash.vue'
import Transaction from './components/Transaction.vue'
import Block from './components/Block.vue'
import Validator from './components/Validator.vue'
import Proposal from './components/Proposal.vue'
import ProposalDetail from './components/ProposalDetail.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/address/:address', component: Address },
    { path: '/hash/:hash', component: Hash },
    { path: '/transaction', component: Transaction },
    { path: '/validator', component: Validator },
    { path: '/block', component: Block },
    { path: '/proposal', component: Proposal },
    { path: '/proposal/:id', component: ProposalDetail },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
