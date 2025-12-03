import { createConfig, http, fallback, readContract } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { ZCHF_MANAGER_ABI, ZCHF_MANAGER_ADDRESS } from '../lib/contracts/zchf-abi';

const config = createConfig({
    chains: [mainnet],
    transports: {
        [mainnet.id]: fallback([
            http('https://rpc.ankr.com/eth'),
            http('https://cloudflare-eth.com'),
            http('https://eth.llamarpc.com'),
        ]),
    },
});

async function main() {
    try {
        console.log('Testing Wagmi RPC connection...');
        const result = await readContract(config, {
            address: ZCHF_MANAGER_ADDRESS,
            abi: ZCHF_MANAGER_ABI,
            functionName: 'getDepositDetails',
            args: ['0x71a4bdb119d1037ad68c0f6455589af8250106ac863deeebd6a5fe59f2a58231'],
            chainId: mainnet.id,
        });
        console.log('Successfully fetched deposit details:', result);
        process.exit(0);
    } catch (error) {
        console.error('Failed to fetch deposit details:', error);
        process.exit(1);
    }
}

main();
