import { NextFunction, Request, Response } from 'express';
import prisma from '../db';
import { STATUS_UPDATE } from '@prisma/client';

export const getUpdates = async (req: Request, res: Response, next: NextFunction) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    // Explicitly typing the reduce parameters
    const updates = products.reduce<{ id: string; createdAt: Date; updatedAt: Date; 
        title: string; body: string; status: STATUS_UPDATE; version: string | null; 
        asset: string | null; productId: string; }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []); 

    if (products.length === 0) {
        return res.json({ message: 'Not found' });
    }
    res.json({ data: updates });
};

export const getOneUpdate = async (req: Request, res: Response, next: NextFunction) => {

    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: update });
};

export const createUpdate = async (req: Request, res: Response) => {
    // const {productId, ...rest} =req.body

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        return res.status(401).json({ message: 'Error' });
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    });
    res.json({ data: update });
};

export const updateUpdate = async (req: Request, res: Response) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    // Explicitly typing the reduce parameters
    const updates = products.reduce<{ id: string; createdAt: Date; updatedAt: Date; 
        title: string; body: string; status: STATUS_UPDATE; version: string | null; 
        asset: string | null; productId: string; }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []); 

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "Nope" });
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });
    res.json({ data: updated });
};

export const deleteUpdated = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    // Explicitly typing the reduce parameters
    const updates = products.reduce<{ id: string; createdAt: Date; updatedAt: Date; 
        title: string; body: string; status: STATUS_UPDATE; version: string | null; 
        asset: string | null; productId: string; }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []); 

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "Nope" });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: deleted });
};
