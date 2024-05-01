import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) {}

    @Post()
    create(@Body() createChannelDto: CreateChannelDto) {
        return this.channelsService.create(createChannelDto);
    }

    @Get()
    findAll() {
        return this.channelsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.channelsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
        return this.channelsService.update(+id, updateChannelDto);
    }

    @Patch(':id/add-users')
    addUsers(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() data: { users: number[] }
    ) {
        return this.channelsService.addUsers(id, companyId, data.users);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.channelsService.remove(+id);
    }
}
