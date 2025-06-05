import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import type { App } from '../../../src/index'
const client = treaty<App>('localhost:3000')

describe('Controller - Folder - Create', () => {
    it('return a response success - without parentID', async () => {
        const body = { name: "folder_"+ new Date().getTime() };
        const { data, status } = await client.v1.folder.post(body)
        
        expect(data?.data.name).toBe(body.name)
        expect(status).toBe(200)
    })

    it('return a response success - with parentID', async () => {
        const { data: dataFolder } = await client.v1.folder.get()
        const parentFolderId = dataFolder.data.length > 0 ? dataFolder.data[0].id : 1;

        const body = { name: "folder_"+ new Date().getTime()+1, parentFolderId };
        const { data, status } = await client.v1.folder.post(body)
        
        expect(data?.data.name).toBe(body.name)
        expect(status).toBe(200)
    })

    it('return a response failed', async () => {
        const { data: dataFolder } = await client.v1.folder.get()
        const name = dataFolder.data.length > 0 ? dataFolder.data[0].name : 'folder 1';

        const body = { name };
        const { status } = await client.v1.folder.post(body)
        expect(status).toBe(500)
    })
})