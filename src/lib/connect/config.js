import { http, createConfig } from '@wagmi/core'
import { avalanche, avalancheFuji, immutableZkEvm, immutableZkEvmTestnet, mainnet, polygon, polygonAmoy, ronin, saigon, sepolia, bsc, bscTestnet } from '@wagmi/core/chains'

const chains = [mainnet, polygonAmoy, polygon, avalanche, avalancheFuji,  sepolia, ronin, saigon, immutableZkEvm, immutableZkEvmTestnet, bsc, bscTestnet];

export const config = createConfig({
  // @ts-ignore
  chains: chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
    [ronin.id]: http(),
    [saigon.id]: http(),
    [immutableZkEvm.id]: http(),
    [immutableZkEvmTestnet.id]: http(),
  },
})