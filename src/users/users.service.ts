import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                lists: true
            }
        })
    }

    async getById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                lists: true
            }
        })

        if (!user) throw new NotFoundException("User not found")

        return user
    }

    async create(newUser: object) {
        
        return await this.prismaService.user.create({
            data: newUser as any
        })
    }

    async update(id: string, updatedUser) {
        try {
            return await this.prismaService.user.update({
                where: {
                    id,
                },
                data: updatedUser
            })
        } catch {
            throw new NotFoundException("User not found")
        }
    }

    async delete(id: string) {
        try {
            return await this.prismaService.user.delete({
                where: { id, }
            })
        } catch {
            throw new NotFoundException("User not found")
        }
    }
}
